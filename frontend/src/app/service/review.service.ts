import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../config';

import {
  RouteReview,
  ReviewRatingSummary,
  EligibleBooking,
} from "../model/review.model";

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly baseUrl = `${url}/api/reviews`;

  constructor(private http: HttpClient) {}

  // Buses (routes) that have reviews, for the route filter. Newest reviews are not included here.
  getReviewedBuses(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(`${this.baseUrl}/buses`);
  }

  getBusRouteReviews(
    busId: string,
    star?: number,
    sort?: string,
    language?: string,
  ): Observable<{
    success: boolean;
    summary: ReviewRatingSummary;
    data: RouteReview[];
  }> {
    let params: any = {};

    if (star) {
      params.star = star;
    }
    if (sort) {
      params.sort = sort;
    }
    if (language) {
      params.language = language;
    }

    return this.http.get<{
      success: boolean;
      summary: ReviewRatingSummary;
      data: RouteReview[];
    }>(`${this.baseUrl}/bus/${busId}`, {
      params,
    });
  }

  submitRouteReview(payload: {
    customerId: string;
    bookingId: string;
    rating: number;
    headline?: string;
    comment: string;
  }): Observable<{
    success: boolean;
    message: string;
    data: RouteReview;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: RouteReview;
    }>(`${this.baseUrl}`, payload);
  }

  editReview(
    reviewId: string,
    payload: {
      customerId: string;
      rating?: number;
      headline?: string;
      comment?: string;
    },
  ): Observable<{
    success: boolean;
    message: string;
    data: RouteReview;
  }> {
    return this.http.put<{
      success: boolean;
      message: string;
      data: RouteReview;
    }>(`${this.baseUrl}/${reviewId}`, payload);
  }

  voteHelpful(
    reviewId: string,
    customerId: string,
  ): Observable<{
    success: boolean;
    upvoted: boolean;
    helpfulCount: number;
  }> {
    return this.http.post<{
      success: boolean;
      upvoted: boolean;
      helpfulCount: number;
    }>(`${this.baseUrl}/${reviewId}/helpful`, {
      customerId,
    });
  }

  reportReview(
    reviewId: string,
    customerId: string,
    reason: string,
  ): Observable<{
    success: boolean;
    message: string;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
    }>(`${this.baseUrl}/${reviewId}/report`, {
      customerId,
      reason,
    });
  }

  getEligibleCompletedBookings(customerId: string): Observable<{
    success: boolean;
    count: number;
    data: EligibleBooking[];
  }> {
    return this.http.get<{
      success: boolean;
      count: number;
      data: EligibleBooking[];
    }>(`${this.baseUrl}/eligible/${customerId}`);
  }
}
