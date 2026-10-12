import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { url } from '../config';

import {
  RoutePlanResponse,
  SavedJourneyRoute,
} from '../model/route-planner.model';

@Injectable({
  providedIn: 'root',
})
export class RoutePlannerService {
  private readonly baseUrl = `${url}/api/route-planner`;

  constructor(private http: HttpClient) {}

  planJourney(payload: {
    origin:
      | string
      | {
          name: string;
          lat: number;
          lng: number;
        };

    destination:
      | string
      | {
          name: string;
          lat: number;
          lng: number;
        };

    waypoints?: Array<
      | string
      | {
          name: string;
          lat: number;
          lng: number;
          stopDurationMinutes?: number;
        }
    >;
  }): Observable<RoutePlanResponse> {
    return this.http.post<RoutePlanResponse>(`${this.baseUrl}/plan`, payload);
  }

  getLiveTrafficDelta(
    originCity: string,
    destinationCity: string,
    routeType: string,
  ): Observable<{
    success: boolean;

    congestionLevel: 'LOW' | 'MODERATE' | 'HEAVY';

    congestionIndex: number;

    trafficDelayMinutes: number;

    totalDurationMinutes: number;

    hotspots: any[];
  }> {
    return this.http.get<{
      success: boolean;

      congestionLevel: 'LOW' | 'MODERATE' | 'HEAVY';

      congestionIndex: number;

      trafficDelayMinutes: number;

      totalDurationMinutes: number;

      hotspots: any[];
    }>(`${this.baseUrl}/traffic-stream`, {
      params: {
        originCity,
        destinationCity,
        routeType,
      },
    });
  }

  saveCustomRoute(payload: SavedJourneyRoute): Observable<{
    success: boolean;
    message: string;
    data: SavedJourneyRoute;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: SavedJourneyRoute;
    }>(`${this.baseUrl}/saved`, payload);
  }

  getUserSavedRoutes(customerId: string): Observable<{
    success: boolean;
    count: number;
    data: SavedJourneyRoute[];
  }> {
    return this.http.get<{
      success: boolean;
      count: number;
      data: SavedJourneyRoute[];
    }>(`${this.baseUrl}/saved/${customerId}`);
  }

  deleteSavedRoute(
    routeId: string,
    customerId: string,
  ): Observable<{
    success: boolean;
    message: string;
  }> {
    return this.http.delete<{
      success: boolean;
      message: string;
    }>(`${this.baseUrl}/saved/${routeId}`, {
      params: {
        customerId,
      },
    });
  }
}
