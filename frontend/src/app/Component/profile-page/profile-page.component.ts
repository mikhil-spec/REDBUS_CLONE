import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../../auth/auth.service';
import { ThemeService } from '../../service/theme.service';
import { TranslationService } from '../../service/translation.service';

type ProfileTab = 'dashboard' | 'trips' | 'profile' | 'preferences';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  activeTab: ProfileTab = 'dashboard';

  readonly tabs: { key: ProfileTab; labelKey: string }[] = [
    { key: 'dashboard', labelKey: 'PROFILE.TAB_DASHBOARD' },
    { key: 'trips', labelKey: 'PROFILE.TAB_TRIPS' },
    { key: 'profile', labelKey: 'PROFILE.TAB_PROFILE' },
    { key: 'preferences', labelKey: 'PROFILE.TAB_PREFERENCES' },
  ];

  constructor(
    public auth: AuthService,
    public themeService: ThemeService,
    public i18n: TranslationService,
    private router: Router
  ) {}

  get user(): AuthUser | null {
    return this.auth.currentUser;
  }

  selectTab(tab: ProfileTab): void {
    this.activeTab = tab;
  }

  setTheme(dark: boolean): void {
    this.themeService.setTheme(dark);
  }

  setLanguage(code: string): void {
    this.i18n.setLanguage(code as any);
  }

  signOut(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
