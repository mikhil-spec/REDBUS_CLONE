import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { TranslationService, LanguageOption } from '../../service/translation.service';
import { ThemeService } from '../../service/theme.service';
import { AuthService } from '../../auth/auth.service';
import { url } from '../../config';

declare global {
  interface Window {
    google?: any;
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  isloggedIn = false;
  isLangDropdownOpen = false;
  selectedLanguage: LanguageOption;
  languages: LanguageOption[] = [];
  unreadCount = 0;
  authError = '';
  welcomeMessage = '';
  private pollSubscription?: Subscription;
  private userSubscription?: Subscription;

  constructor(
    public themeService: ThemeService,
    public translationService: TranslationService,
    public authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private zone: NgZone,
  ) {
    this.languages = this.translationService.availableLanguages;
    this.selectedLanguage = this.languages[0];
  }

  ngOnInit(): void {
    this.syncActiveLanguage();
    // Follow the auth state everywhere (sign-in, sign-out from any page), not only from this navbar.
    this.userSubscription = this.authService.user$.subscribe((user) => {
      const wasLoggedIn = this.isloggedIn;
      this.isloggedIn = !!user && this.authService.isLoggedIn();
      if (!this.isloggedIn) {
        this.unreadCount = 0;
        if (wasLoggedIn) setTimeout(() => this.renderGoogleButton(), 0);
      }
    });
    this.refreshUserState();
    this.pollSubscription = interval(15000).subscribe(() => this.fetchUnreadCount());
  }

  ngAfterViewInit(): void {
    this.renderGoogleButton();
  }

  ngOnDestroy(): void {
    this.pollSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  get isGoogleConfigured(): boolean {
    return !!this.authService.getGoogleClientId();
  }

  showSignInNotConfigured(): void {
    this.authError = this.translationService.translate('NAV.SIGN_IN_NOT_CONFIGURED');
  }

  private refreshUserState(): void {
    const user = this.authService.currentUser;
    this.isloggedIn = this.authService.isLoggedIn();
    if (!user) return;

    this.translationService.setUserId(user._id);
    this.themeService.setUserId(user._id);
    if (user.notificationPreferences?.preferredLanguage) {
      this.translationService.setLanguage(user.notificationPreferences.preferredLanguage);
      this.syncActiveLanguage();
    }
    this.fetchUnreadCount();
  }

  private renderGoogleButton(): void {
    const clientId = this.authService.getGoogleClientId();
    if (!clientId || this.isloggedIn) return;

    const tryRender = () => {
      if (!window.google?.accounts?.id) {
        setTimeout(tryRender, 500);
        return;
      }
      const element = document.getElementById('google-btn');
      if (!element) return;
      element.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => this.handleGoogleCredential(response?.credential),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      window.google.accounts.id.renderButton(element, {
        type: 'standard',
        theme: this.themeService.isDark() ? 'filled_black' : 'outline',
        size: 'medium',
        text: 'signin_with',
        shape: 'rectangular',
        width: 180,
      });
      const signupElement = document.getElementById('google-signup-btn');
      if (signupElement) {
        window.google.accounts.id.renderButton(signupElement, {
          type: 'standard',
          theme: this.themeService.isDark() ? 'filled_black' : 'outline',
          size: 'medium',
          text: 'signup_with',
          shape: 'rectangular',
          width: 180,
        });
      }
    };
    tryRender();
  }

  private handleGoogleCredential(credential: string): void {
    if (!credential) return;
    this.authError = '';
    this.welcomeMessage = '';
    this.authService.googleLogin(credential).subscribe({
      next: (response) => {
        this.zone.run(() => {
          this.authService.completeLogin(response);
          this.isloggedIn = true;
          this.authError = '';
          if (response.isNewAccount) {
            this.welcomeMessage = this.translationService.translate('NAV.WELCOME_NEW');
          }
          this.refreshUserState();
        });
      },
      error: (error) => {
        this.zone.run(() => {
          this.welcomeMessage = '';
          this.authError = this.describeSignInError(error);
        });
      },
    });
  }

  // status 0 means the browser could not reach the server at all (server not running, wrong URL, or blocked).
  private describeSignInError(error: any): string {
    if (!error || error.status === 0) {
      return this.translationService.translate('NAV.ERR_SERVER_UNREACHABLE');
    }
    if (error.error?.message) return error.error.message;
    return this.translationService.translate('NAV.ERR_SIGN_IN_FAILED');
  }

  private fetchUnreadCount(): void {
    const user = this.authService.currentUser;
    if (!user?._id) return;
    this.http.get<{ success: boolean; unreadCount: number }>(`${url}/api/notifications/user/${user._id}?unreadOnly=true`).subscribe({
      next: (res) => this.unreadCount = res.unreadCount || 0,
      error: () => {},
    });
  }

  private syncActiveLanguage(): void {
    const currentCode = this.translationService.getCurrentLanguage();
    const match = this.languages.find((l) => l.code === currentCode);
    if (match) this.selectedLanguage = match;
  }

  toggleDropdown(): void { this.isLangDropdownOpen = !this.isLangDropdownOpen; }

  chooseLanguage(lang: LanguageOption): void {
    this.selectedLanguage = lang;
    this.translationService.setLanguage(lang.code);
    this.isLangDropdownOpen = false;
  }

  navigate(path: string): void { this.router.navigate([path]); }

  handlelogout(): void {
    this.authService.logout();
    this.isloggedIn = false;
    this.unreadCount = 0;
    this.router.navigate(['/']);
  }
}
