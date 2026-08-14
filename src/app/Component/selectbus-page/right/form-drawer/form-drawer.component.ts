import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-form-drawer',
  templateUrl: './form-drawer.component.html',
  styleUrl: './form-drawer.component.css'
})
export class FormDrawerComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  @Input() selectedSeats: number[] = [];
  @Input() seatPrice: number = 0;
  @Input() routeDetails: any;
  @Input() busId: string = '';
  @Input() busArrivalTime: number = 0;
  @Input() busDepartureTime: number = 0;
  @Input() operatorName: string = '';

  formDrawerState: boolean = false;
  sidenavOpened: boolean = false;

  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  // Legacy Input Property Aliases & Getters/Setters for Backwards Compatibility
  @Input() set selectedseat(val: number[]) { this.selectedSeats = val; }
  get selectedseat(): number[] { return this.selectedSeats; }

  @Input() set seatprice(val: number) { this.seatPrice = val; }
  get seatprice(): number { return this.seatPrice; }

  @Input() set routedetails(val: any) { this.routeDetails = val; }
  get routedetails(): any { return this.routeDetails; }

  @Input() set busid(val: string) { this.busId = val; }
  get busid(): string { return this.busId; }

  @Input() set busarrivaltime(val: number) { this.busArrivalTime = val; }
  get busarrivaltime(): number { return this.busArrivalTime; }

  @Input() set busdeparturetime(val: number) { this.busDepartureTime = val; }
  get busdeparturetime(): number { return this.busDepartureTime; }

  @Input() set operatorname(val: string) { this.operatorName = val; }
  get operatorname(): string { return this.operatorName; }

  get formdrawerstate(): boolean { return this.formDrawerState; }
  set formdrawerstate(val: boolean) { this.formDrawerState = val; }

  get sidenavopened(): boolean { return this.sidenavOpened; }
  set sidenavopened(val: boolean) { this.sidenavOpened = val; }

  toogledrawer(open: boolean): void {
    this.formDrawerState = open;
  }
}