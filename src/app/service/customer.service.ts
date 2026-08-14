import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { url } from '../config';

export interface CustomerPayload {
  name: string;
  email: string;
  id?: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly apiUrl: string = `${url}customer`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Create or fetch a customer record by email / googleId
   */
  addCustomer(user: CustomerPayload): Observable<Customer> {
    const customerPayload: Partial<Customer> = {
      name: user.name,
      email: user.email,
      googleId: user.id,
      profilePicture: user.picture,
    };
    return this.http.post<Customer>(this.apiUrl, customerPayload);
  }

  // Backwards compatibility alias
  addcustomermongo(user: any) {
    return this.addCustomer(user);
  }
}