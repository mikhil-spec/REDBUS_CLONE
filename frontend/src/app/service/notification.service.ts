import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, firstValueFrom } from "rxjs";
import { url, vapidPublicKey } from "../config";

import {
  UserNotification,
  NotificationPreferences
} from "../model/notification.model";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  private readonly baseUrl =
    `${url}/api/notifications`;

  constructor(
    private http: HttpClient
  ) {}

  getUserNotifications(
    customerId: string,
    unreadOnly = false,
    eventType?: string
  ): Observable<{
    success: boolean;
    unreadCount: number;
    count: number;
    data: UserNotification[];
  }> {

    let params: any = {};

    if (unreadOnly) {
      params.unreadOnly = "true";
    }

    if (
      eventType &&
      eventType !== "ALL"
    ) {
      params.eventType = eventType;
    }

    return this.http.get<{
      success: boolean;
      unreadCount: number;
      count: number;
      data: UserNotification[];
    }>(
      `${this.baseUrl}/user/${customerId}`,
      { params }
    );
  }

  markAsRead(
    notificationId: string,
    customerId: string
  ): Observable<{
    success: boolean;
    data: UserNotification;
  }> {

    return this.http.patch<{
      success: boolean;
      data: UserNotification;
    }>(
      `${this.baseUrl}/read/${notificationId}`,
      {
        customerId
      }
    );
  }

  markAllAsRead(
    customerId: string
  ): Observable<{
    success: boolean;
    message: string;
  }> {

    return this.http.patch<{
      success: boolean;
      message: string;
    }>(
      `${this.baseUrl}/read-all`,
      {
        customerId,
        markAll: true
      }
    );
  }

  getPreferences(
    customerId: string
  ): Observable<{
    success: boolean;
    data: NotificationPreferences;
  }> {

    return this.http.get<{
      success: boolean;
      data: NotificationPreferences;
    }>(
      `${this.baseUrl}/preferences/${customerId}`
    );
  }

  updatePreferences(
    customerId: string,
    preferences:
      Partial<NotificationPreferences>
  ): Observable<{
    success: boolean;
    message: string;
    data: NotificationPreferences;
  }> {

    return this.http.put<{
      success: boolean;
      message: string;
      data: NotificationPreferences;
    }>(
      `${this.baseUrl}/preferences/${customerId}`,
      preferences
    );
  }

  triggerTestNotification(
    payload: {
      recipientId: string;
      eventType: string;
      templateData: any;
      metadata?: any;
    }
  ): Observable<{
    success: boolean;
    message: string;
    data: UserNotification;
  }> {

    return this.http.post<{
      success: boolean;
      message: string;
      data: UserNotification;
    }>(
      `${this.baseUrl}/dispatch`,
      payload
    );
  }

  async registerBrowserPush(customerId: string): Promise<void> {
    if (!vapidPublicKey || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
    const registration = await navigator.serviceWorker.register('/assets/push-sw.js');
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
      });
    }

    await firstValueFrom(this.http.post(`${this.baseUrl}/push-subscription`, { customerId, subscription }));
  }

  private urlBase64ToUint8Array(value: string): Uint8Array {
    const padding = '='.repeat((4 - value.length % 4) % 4);
    const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = window.atob(base64);
    return Uint8Array.from([...raw].map(char => char.charCodeAt(0)));
  }

  retryNotification(
    notificationId: string,
    customerId: string
  ): Observable<{
    success: boolean;
    message: string;
    data: UserNotification;
  }> {

    return this.http.post<{
      success: boolean;
      message: string;
      data: UserNotification;
    }>(
      `${this.baseUrl}/retry/${notificationId}`,
      {
        customerId
      }
    );
  }
}