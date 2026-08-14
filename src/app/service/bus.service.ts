import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../model/bus.model';
import { Booking } from '../model/booking.model';
import { Route } from '../model/routes.model';
import { url } from '../config';

export interface RouteSearchResponse {
  route: Route;
  matchedBuses: Bus[];
  busidwithseatobj: { [busId: string]: number[] };
}

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private readonly bookingApiUrl: string = `${url}booking`;
  private readonly routeApiUrl: string = `${url}routes`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetch route details, matched buses, and booked seats for a search query
   */
  getBusDetails(depart: string, arrival: string, date: string): Observable<RouteSearchResponse> {
    const requestUrl = `${this.routeApiUrl}/${depart}/${arrival}/${date}`;
    return this.http.get<RouteSearchResponse>(requestUrl);
  }

  /**
   * Create a new booking in the database
   */
  addBooking(bookingData: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.bookingApiUrl, bookingData);
  }

  /**
   * Fetch all bookings for a given customer ID
   */
  getBookingByCustomerId(customerId: string): Observable<Booking[]> {
    const requestUrl = `${this.bookingApiUrl}/${customerId}`;
    return this.http.get<Booking[]>(requestUrl);
  }

  // Backwards compatibility aliases for existing component references
  GETBUSDETAILS(depart: string, arrival: string, date: string) {
    return this.getBusDetails(depart, arrival, date) as any;
  }
  addbusmongo(myBooking: any) {
    return this.addBooking(myBooking);
  }
  getbusmongo(id: string) {
    return this.getBookingByCustomerId(id);
  }
}