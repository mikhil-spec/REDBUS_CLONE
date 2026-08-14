import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-seats',
  templateUrl: './view-seats.component.html',
  styleUrl: './view-seats.component.css'
})
export class ViewSeatsComponent {
  @Input() filledSeats: number[] = [];
  @Input() seatPrice: number = 0;
  @Input() routeDetails: any = null;
  @Input() busId: string = '';
  @Input() busArrivalTime: number = 0;
  @Input() busDepartureTime: number = 0;
  @Input() operatorName: string = '';

  selectedSeats: number[] = [];
  boardAndDrop: boolean = false;

  generateArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index + 1);
  }

  handleSelectedSeats(seatNo: number): void {
    if (this.selectedSeats.includes(seatNo)) {
      this.selectedSeats = this.selectedSeats.filter((item) => item !== seatNo);
    } else {
      this.selectedSeats = [...this.selectedSeats, seatNo];
    }
  }

  handleBoardDrop(): void {
    this.boardAndDrop = !this.boardAndDrop;
  }

  // Legacy Input Aliases & Getters/Setters for Backwards Compatibility
  @Input() set filledseats(val: number[]) { this.filledSeats = val; }
  get filledseats(): number[] { return this.filledSeats; }

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

  get selectedseats(): number[] { return this.selectedSeats; }
  set selectedseats(val: number[]) { this.selectedSeats = val; }

  get boardanddrop(): boolean { return this.boardAndDrop; }
  set boardanddrop(val: boolean) { this.boardAndDrop = val; }

  generatearray(length: number): number[] {
    return this.generateArray(length);
  }

  handleselectedseats(seatNo: number): void {
    this.handleSelectedSeats(seatNo);
  }

  handleboarddrop(): void {
    this.handleBoardDrop();
  }
}