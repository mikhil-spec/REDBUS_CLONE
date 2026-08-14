import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus-box',
  templateUrl: './bus-box.component.html',
  styleUrl: './bus-box.component.css'
})
export class BusBoxComponent implements OnInit {
  @Input() rating: number[] = [];
  @Input() operatorName: string = '';
  @Input() busType: string = '';
  @Input() departureTime: string = '';
  @Input() reschedulable: number | boolean = 0;
  @Input() liveTracking: number | boolean = 0;
  @Input() filledSeats: any[] = [];
  @Input() routeDetails: any;
  @Input() busId: string = '';

  avgRating: number = 0;
  totalReview: number = 0;
  seatPrice: number = 0;
  busTypeName: string = '';
  busDepartureTime: number = 0;
  busArrivalTime: number = 0;

  ngOnInit(): void {
    this.calculateRating();
    this.calculatePriceAndType();
    this.calculateTimes();
  }

  private calculateRating(): void {
    if (this.rating && this.rating.length > 0) {
      const sum = this.rating.reduce((acc, curr) => acc + curr, 0);
      this.totalReview = this.rating.length;
      this.avgRating = parseFloat((sum / this.totalReview).toFixed(1));
    } else {
      this.avgRating = 4.0;
      this.totalReview = 1;
    }
  }

  private calculatePriceAndType(): void {
    const duration = this.routeDetails?.duration ? Math.floor(this.routeDetails.duration) : 4;
    const type = (this.busType || '').toLowerCase();

    if (type === 'standard') {
      this.seatPrice = Math.round((50 * duration) / 2);
      this.busTypeName = 'Standard';
    } else if (type === 'sleeper') {
      this.seatPrice = Math.round((100 * duration) / 2);
      this.busTypeName = 'Sleeper';
    } else if (type.includes('a/c') || type.includes('ac')) {
      this.seatPrice = Math.round((125 * duration) / 2);
      this.busTypeName = 'A/C Seater';
    } else {
      this.seatPrice = Math.round((75 * duration) / 2);
      this.busTypeName = 'Non - A/C';
    }
  }

  private calculateTimes(): void {
    const numericValue = parseInt(this.departureTime || '0', 10);
    this.busDepartureTime = isNaN(numericValue) ? 0 : numericValue;
    const duration = this.routeDetails?.duration || 0;
    this.busArrivalTime = (this.busDepartureTime + duration) % 24;
  }

  // Legacy Input Property Aliases & Getters/Setters for Backwards Compatibility
  @Input() set operatorname(val: string) { this.operatorName = val; }
  get operatorname(): string { return this.operatorName; }

  @Input() set bustype(val: string) { this.busType = val; }
  get bustype(): string { return this.busType; }

  @Input() set departuretime(val: string) { this.departureTime = val; }
  get departuretime(): string { return this.departureTime; }

  @Input() set livetracking(val: number | boolean) { this.liveTracking = val; }
  get livetracking(): number | boolean { return this.liveTracking; }

  @Input() set filledseats(val: any[]) { this.filledSeats = val; }
  get filledseats(): any[] { return this.filledSeats; }

  @Input() set routedetails(val: any) { this.routeDetails = val; }
  get routedetails(): any { return this.routeDetails; }

  @Input() set busid(val: string) { this.busId = val; }
  get busid(): string { return this.busId; }

  get avgrating(): number { return this.avgRating; }
  get totalreview(): number { return this.totalReview; }
  get seatprivce(): number { return this.seatPrice; }
  get bustypename(): string { return this.busTypeName; }
  get busdeparturetime(): number { return this.busDepartureTime; }
  get busarrivaltime(): number { return this.busArrivalTime; }
}