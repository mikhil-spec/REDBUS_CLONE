import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { url } from '../../config';
import { AuthService, AuthUser } from '../../auth/auth.service';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  loading = true;
  saving = false;
  loadErrorKey = '';
  messageKey = '';
  messageIsError = false;
  profile: any = null;
  form = { name: '', phone: '', gender: 'Other', age: 18 };

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private router: Router,
    public i18n: TranslationService
  ) {}

  get user(): AuthUser | null {
    return this.auth.currentUser;
  }

  t(key: string): string {
    return key ? this.i18n.translate(key) : '';
  }

  // Google accounts receive a placeholder phone value; never show or edit it as a real number.
  get phoneForDisplay(): string {
    const phone = this.profile?.phone || '';
    return phone.startsWith('google-') ? '' : phone;
  }

  languageName(code: string): string {
    const found = this.i18n.availableLanguages.find((l) => l.code === code);
    return found ? found.nativeLabel : code || '-';
  }

  ngOnInit(): void {
    if (!this.user) {
      this.loading = false;
      return;
    }
    this.http.get<{ success: boolean; data: any }>(`${url}/api/customer`).subscribe({
      next: (res) => {
        this.profile = res.data;
        this.form = {
          name: res.data.name || '',
          phone: this.phoneForDisplay,
          gender: res.data.gender || 'Other',
          age: res.data.age || 18,
        };
        this.loading = false;
      },
      error: (err: any) => {
        if (err?.status === 401) { this.auth.expireSession(); this.loadErrorKey = 'ACCOUNT.SESSION_EXPIRED'; } else { this.loadErrorKey = 'ACCOUNT.LOAD_FAILED'; }
        this.loading = false;
      },
    });
  }

  save(): void {
    this.saving = true;
    this.messageKey = '';
    this.http.post<{ success: boolean; data: any }>(`${url}/api/customer`, { ...this.form }).subscribe({
      next: (res) => {
        this.profile = res.data;
        this.auth.setCurrentUser(res.data as AuthUser);
        this.messageIsError = false;
        this.messageKey = 'ACCOUNT.SAVED';
        this.saving = false;
      },
      error: () => {
        this.messageIsError = true;
        this.messageKey = 'ACCOUNT.SAVE_FAILED';
        this.saving = false;
      },
    });
  }

  signOut(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
