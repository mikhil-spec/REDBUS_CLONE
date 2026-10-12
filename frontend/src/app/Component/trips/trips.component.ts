import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../config';
import { AuthService, AuthUser } from '../../auth/auth.service';
import { TranslationService } from '../../service/translation.service';

type TripFilter = 'all' | 'upcoming' | 'completed' | 'cancelled';
type TripSort = 'newest' | 'oldest' | 'fareHigh' | 'fareLow';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
})
export class TripsComponent implements OnInit {
  loading = true;
  loadErrorKey = '';
  actionKey = '';
  actionIsError = false;
  cancellingPnr = '';
  trips: any[] = [];
  filter: TripFilter = 'all';
  readonly filters: TripFilter[] = ['all', 'upcoming', 'completed', 'cancelled'];
  sort: TripSort = 'newest';
  readonly sortOptions: { key: TripSort; labelKey: string }[] = [
    { key: 'newest', labelKey: 'TRIPS.SORT_NEWEST' },
    { key: 'oldest', labelKey: 'TRIPS.SORT_OLDEST_TRIP' },
    { key: 'fareHigh', labelKey: 'TRIPS.SORT_FARE_HIGH' },
    { key: 'fareLow', labelKey: 'TRIPS.SORT_FARE_LOW' },
  ];

  constructor(public auth: AuthService, private http: HttpClient, public i18n: TranslationService) {}

  get user(): AuthUser | null {
    return this.auth.currentUser;
  }

  t(key: string, vars?: Record<string, string | number>): string {
    return key ? this.i18n.translate(key, vars || {}) : '';
  }

  ngOnInit(): void {
    if (!this.user) {
      this.loading = false;
      return;
    }
    this.load();
  }

  load(): void {
    this.loading = true;
    this.loadErrorKey = '';
    this.http.get<{ success: boolean; data: any[] }>(`${url}/api/booking/mine`).subscribe({
      next: (res) => {
        this.trips = res.data || [];
        this.loading = false;
      },
      error: (err: any) => {
        if (err?.status === 401) {
          this.auth.expireSession();
          this.loadErrorKey = 'TRIPS.SESSION_EXPIRED';
        } else {
          this.loadErrorKey = 'DASHBOARD.LOAD_FAILED';
        }
        this.loading = false;
      },
    });
  }

  isUpcoming(b: any): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return b.bookingStatus === 'Confirmed' && new Date(b.journeyDate) >= today;
  }

  get filtered(): any[] {
    switch (this.filter) {
      case 'upcoming': return this.trips.filter((b) => this.isUpcoming(b));
      case 'completed': return this.trips.filter((b) => b.bookingStatus === 'Completed');
      case 'cancelled': return this.trips.filter((b) => b.bookingStatus === 'Cancelled');
      default: return this.trips;
    }
  }

  get visible(): any[] {
    const list = [...this.filtered];
    switch (this.sort) {
      case 'oldest': return list.sort((a, b) => new Date(a.journeyDate).getTime() - new Date(b.journeyDate).getTime());
      case 'fareHigh': return list.sort((a, b) => (b.totalFare || 0) - (a.totalFare || 0));
      case 'fareLow': return list.sort((a, b) => (a.totalFare || 0) - (b.totalFare || 0));
      default: return list.sort((a, b) => new Date(b.journeyDate).getTime() - new Date(a.journeyDate).getTime());
    }
  }

  filterKey(filter: TripFilter): string {
    return `TRIPS.FILTER_${filter.toUpperCase()}`;
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

  cancel(b: any): void {
    if (!window.confirm(this.t('TRIPS.CANCEL_CONFIRM', { pnr: b.pnr }))) return;
    this.cancellingPnr = b.pnr;
    this.actionKey = '';
    this.http.put<{ success: boolean }>(`${url}/api/booking/cancel/${b.pnr}`, {}).subscribe({
      next: () => {
        b.bookingStatus = 'Cancelled';
        this.cancellingPnr = '';
        this.actionIsError = false;
        this.actionKey = 'TRIPS.CANCELLED_OK';
      },
      error: () => {
        this.cancellingPnr = '';
        this.actionIsError = true;
        this.actionKey = 'TRIPS.CANCEL_FAILED';
      },
    });
  }
}
