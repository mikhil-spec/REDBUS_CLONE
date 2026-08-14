import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  private readonly dataSource = new BehaviorSubject<any>(null);
  public readonly currentData$: Observable<any> = this.dataSource.asObservable();

  private readonly passDetails = new BehaviorSubject<any>(null);
  public readonly passData$: Observable<any> = this.passDetails.asObservable();

  // Backwards compatibility aliases for existing component subscriptions
  public currentdata = this.currentData$;
  public passdata = this.passData$;

  /**
   * Broadcast route or search filter state across components[cite: 38]
   */
  sendObj(obj: any): void {
    this.dataSource.next(obj);
  }

  /**
   * Broadcast passenger/booking selection state across components[cite: 38]
   */
  passObj(obj: any): void {
    this.passDetails.next(obj);
  }

  // Backwards compatibility method aliases[cite: 38]
  sendobj(obj: any): void {
    this.sendObj(obj);
  }
  passobj(obj: any): void {
    this.passObj(obj);
  }
}