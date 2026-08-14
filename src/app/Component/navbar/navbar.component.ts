import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

declare var google: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly customerService: CustomerService,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    // Initialize Google Accounts SDK
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '480652374191-jons5b69dcmgdaerma5inti20rb4a2v9.apps.googleusercontent.com',
        callback: (response: any) => this.handleLogin(response)
      });
    }
  }

  ngAfterViewInit(): void {
    this.renderGoogleButton();
  }

  private checkLoginStatus(): void {
    const loggedUser = sessionStorage.getItem('Loggedinuser');
    this.isLoggedIn = !!loggedUser;
  }

  private renderGoogleButton(): void {
    const googleBtn = document.getElementById('google-btn');
    if (googleBtn && typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.renderButton(googleBtn, {
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        width: 150
      });
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      console.error('Failed to decode JWT token:', e);
      return {};
    }
  }

  handleLogin(response: any): void {
    const payload = this.decodeToken(response.credential);
    
    this.customerService.addCustomer(payload).subscribe({
      next: (user) => {
        sessionStorage.setItem('Loggedinuser', JSON.stringify(user));
        this.ngZone.run(() => {
          this.isLoggedIn = true;
        });
      },
      error: (error) => {
        console.error('Customer login request failed:', error);
      }
    });
  }

  handleLogout(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.disableAutoSelect();
    }
    sessionStorage.removeItem('Loggedinuser');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  // Legacy property getter for template backwards compatibility
  get isloggedIn(): boolean {
    return this.isLoggedIn;
  }
}