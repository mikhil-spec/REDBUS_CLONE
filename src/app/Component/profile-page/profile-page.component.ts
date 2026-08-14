import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../../service/bus.service';
import { Booking } from '../../model/booking.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  selectedItem: string = 'trips';
  currentCustomer: any = null;
  currentName: string = '';
  currentEmail: string = '';
  myTrip: Booking[] = [];

  constructor(
    private readonly busBookingService: BusService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const rawUserData = sessionStorage.getItem('Loggedinuser');
    if (!rawUserData) {
      this.router.navigate(['/']);
      return;
    }

    try {
      this.currentCustomer = JSON.parse(rawUserData);
      this.currentName = this.currentCustomer.name || '';
      this.currentEmail = this.currentCustomer.email || '';

      if (this.currentCustomer._id) {
        this.busBookingService.getBookingByCustomerId(this.currentCustomer._id).subscribe({
          next: (bookings: Booking[]) => {
            this.myTrip = bookings;
          },
          error: (err) => {
            console.error('Failed to load user trip bookings:', err);
          }
        });
      }
    } catch (e) {
      console.error('Error parsing logged in user data:', e);
      sessionStorage.removeItem('Loggedinuser');
      this.router.navigate(['/']);
    }
  }

  handleListItemClick(selected: string): void {
    this.selectedItem = selected;
  }

  // Legacy Property Getters & Methods for Template Compatibility
  get selecteditem(): string { return this.selectedItem; }
  set selecteditem(val: string) { this.selectedItem = val; }

  get currentcustomer(): any { return this.currentCustomer; }
  get currentname(): string { return this.currentName; }
  get currentemail(): string { return this.currentEmail; }
  get mytrip(): Booking[] { return this.myTrip; }

  handlelistitemclick(selected: string): void {
    this.handleListItemClick(selected);
  }
}