import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottom-tab',
  templateUrl: './bottom-tab.component.html',
  styleUrl: './bottom-tab.component.css'
})
export class BottomTabComponent {
  @Input() filledSeats: number[] = [];
  @Input() seatPrice: number = 0;
  @Input() routeDetails: any;
  @Input() busArrivalTime: number = 0;
  @Input() busDepartureTime: number = 0;
  @Input() operatorName: string = '';
  @Input() busId: string = '';

  tabState: boolean[] = [false, false, false, false, false];

  handleTabState(value: number): void {
    for (let i = 0; i < this.tabState.length; i++) {
      this.tabState[i] = i === value && !this.tabState[i];
    }
  }

  // Legacy Property Getters & Setters for Parent Component Backwards Compatibility
  @Input() set filledseats(val: number[]) { this.filledSeats = val; }
  get filledseats(): number[] { return this.filledSeats; }

  @Input() set seatprice(val: number) { this.seatPrice = val; }
  get seatprice(): number { return this.seatPrice; }

  @Input() set routedetials(val: any) { this.routeDetails = val; }
  get routedetials(): any { return this.routeDetails; }

  @Input() set routedetails(val: any) { this.routeDetails = val; }
  get routedetails(): any { return this.routeDetails; }

  @Input() set busarrivaltime(val: number) { this.busArrivalTime = val; }
  get busarrivaltime(): number { return this.busArrivalTime; }

  @Input() set busdeparturetime(val: number) { this.busDepartureTime = val; }
  get busdeparturetime(): number { return this.busDepartureTime; }

  @Input() set operatorname(val: string) { this.operatorName = val; }
  get operatorname(): string { return this.operatorName; }

  @Input() set busid(val: string) { this.busId = val; }
  get busid(): string { return this.busId; }

  get tabstate(): boolean[] { return this.tabState; }

  handletabstate(value: number): void {
    this.handleTabState(value);
  }
}