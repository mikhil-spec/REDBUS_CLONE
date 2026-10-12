import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { url } from '../../config';
import { AuthService, AuthUser } from '../../auth/auth.service';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  loading = true;
  loadErrorKey = '';
  bookings: any[] = [];
  unreadCount = 0;
  reviewCount = 0;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    public i18n: TranslationService
  ) {}

  get user(): AuthUser | null {
    return this.auth.currentUser;
  }

  t(key: string): string {
    return key ? this.i18n.translate(key) : '';
  }

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (!user) {
      this.loading = false;
      return;
    }

    const bookings$ = this.http
      .get<{ success: boolean; data: any[] }>(`${url}/api/booking/mine`)
      .pipe(map((res) => res.data || []), catchError(() => of(null)));

    const unread$ = this.http
      .get<{ success: boolean; unreadCount: number }>(`${url}/api/notifications/user/${user._id}?unreadOnly=true`)
      .pipe(map((res) => res.unreadCount || 0), catchError(() => of(0)));

    const reviews$ = this.http
      .get<{ success: boolean; count: number }>(`${url}/api/reviews/eligible/${user._id}`)
      .pipe(map((res) => res.count || 0), catchError(() => of(0)));

    forkJoin({ bookings: bookings$, unread: unread$, reviews: reviews$ }).subscribe((res) => {
      this.bookings = res.bookings ?? [];
      this.loadErrorKey = res.bookings === null ? 'DASHBOARD.LOAD_FAILED' : '';
      this.unreadCount = res.unread;
      this.reviewCount = res.reviews;
      this.loading = false;
    });
  }

  get upcomingCount(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.bookings.filter(
      (b) => b.bookingStatus === 'Confirmed' && new Date(b.journeyDate) >= today
    ).length;
  }

  statusKey(status: string): string {
    return `DASHBOARD.STATUS_${(status || '').toUpperCase()}`;
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
