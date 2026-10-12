import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TRANSLATION_DICTIONARY } from '../i18n/translations';
import { UI_STRINGS } from '../i18n/ui-strings';
import { url } from '../config';

export interface LanguageOption {
  code: 'en' | 'hi' | 'te' | 'ta';
  label: string;
  nativeLabel: string;
  flag: string;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly defaultLanguage: LanguageOption['code'] = 'en';
  private readonly storageKey = 'redbus_user_lang';
  private activeLangSubject = new BehaviorSubject<LanguageOption['code']>(this.defaultLanguage);
  readonly currentLang$: Observable<LanguageOption['code']> = this.activeLangSubject.asObservable();
  private activeUserId: string | null = null;

  readonly availableLanguages: LanguageOption[] = [
    { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳' },
  ];

  constructor(private http: HttpClient) {
    this.initLanguage();
  }

  private initLanguage(): void {
    const cached = localStorage.getItem(this.storageKey) as LanguageOption['code'] | null;
    if (cached && this.isSupported(cached)) this.activeLangSubject.next(cached);
  }

  setUserId(userId: string): void {
    this.activeUserId = userId || null;
    if (!this.activeUserId) return;
    this.http.get<any>(`${url}/api/customer/${this.activeUserId}`).subscribe({
      next: (response) => {
        const serverLanguage = response?.data?.notificationPreferences?.preferredLanguage;
        if (serverLanguage && this.isSupported(serverLanguage)) {
          // The account is the source of truth once signed in.
          this.setLanguage(serverLanguage, false);
        } else {
          // The account has no language yet: save the choice made on this device to the account.
          const deviceLanguage = localStorage.getItem(this.storageKey);
          if (deviceLanguage && this.isSupported(deviceLanguage as LanguageOption['code'])) {
            this.setLanguage(deviceLanguage as LanguageOption['code'], true);
          }
        }
      },
      error: () => {},
    });
  }

  getCurrentLanguage(): LanguageOption['code'] { return this.activeLangSubject.value; }

  setLanguage(langCode: LanguageOption['code'], syncRemote = true): void {
    if (!this.isSupported(langCode)) return;
    this.activeLangSubject.next(langCode);
    localStorage.setItem(this.storageKey, langCode);
    if (syncRemote && this.activeUserId) {
      this.http.put(`${url}/api/customer/${this.activeUserId}/language`, { language: langCode }).subscribe({ error: () => {} });
    }
  }

  translate(keyPath: string, variables: Record<string, string | number> = {}): string {
    const current = this.getCurrentLanguage();
    let text = this.lookup(current, keyPath);
    if (!text && current !== this.defaultLanguage) text = this.lookup(this.defaultLanguage, keyPath);
    if (!text) return keyPath;
    Object.keys(variables).forEach((key) => {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), String(variables[key]));
    });
    return text;
  }

  // Section dictionary first, then the template UI strings (keys under UI.*).
  private lookup(lang: LanguageOption['code'], keyPath: string): string {
    return this.resolveKey((TRANSLATION_DICTIONARY as any)[lang], keyPath)
      || this.resolveKey((UI_STRINGS as any)[lang], keyPath);
  }

  private resolveKey(dictionary: any, path: string): string {
    if (!dictionary || !path) return '';
    let current = dictionary;
    for (const segment of path.split('.')) {
      if (!current || typeof current !== 'object' || !(segment in current)) return '';
      current = current[segment];
    }
    return typeof current === 'string' ? current : '';
  }

  private isSupported(value: string): value is LanguageOption['code'] {
    return ['en', 'hi', 'te', 'ta'].includes(value);
  }
}
