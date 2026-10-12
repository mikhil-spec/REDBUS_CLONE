import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../../../service/review.service';

@Component({
  selector: 'app-bus-box',
  templateUrl: './bus-box.component.html',
  styleUrl: './bus-box.component.css'
})
export class BusBoxComponent implements OnInit {
  @Input() rating: number[] = [];
  @Input() operatorname = '';
  @Input() bustype = '';
  @Input() departuretime = '';
  @Input() reschedulable = 0;
  @Input() livetracking = 0;
  @Input() filledseats: any[] = [];
  @Input() routedetails: any;
  @Input() busid = '';
  @Input() fare = 0;
  @Input() totalseats = 0;

  avgrating = 0;
  totalreview = 0;
  seatprivce = 0;
  bustypename = '';
  busdeparturetime = 0;
  busarrivaltime = 0;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadVerifiedReviewSummary();

    if (this.bustype === 'standard') {
      this.seatprivce = 50 * Math.floor(this.routedetails.duration) / 2;
      this.bustypename = 'standard';
    } else if (this.bustype === 'sleeper') {
      this.seatprivce = 100 * Math.floor(this.routedetails.duration) / 2;
      this.bustypename = 'sleeper';
    } else if (this.bustype === 'A/C Seater') {
      this.seatprivce = 125 * Math.floor(this.routedetails.duration) / 2;
      this.bustypename = 'A/C Seater';
    } else {
      this.seatprivce = 75 * Math.floor(this.routedetails.duration) / 2;
      this.bustypename = 'Non - A/C';
    }

    // The price is the fare stored for this bus, the same amount that is booked and paid.
    if (this.fare > 0) {
      this.seatprivce = this.fare;
    }

    const numericvalue = parseInt(this.departuretime, 10) || 0;
    this.busdeparturetime = numericvalue;
    this.busarrivaltime = (numericvalue + Number(this.routedetails?.duration || 0)) % 24;
  }

  private loadVerifiedReviewSummary(): void {
    if (!this.busid) {
      this.avgrating = this.rating.length ? Number((this.rating.reduce((a, b) => a + b, 0) / this.rating.length).toFixed(1)) : 0;
      this.totalreview = this.rating.length;
      return;
    }

    this.reviewService.getBusRouteReviews(this.busid, 0, 'recent').subscribe({
      next: (res) => {
        this.avgrating = res.summary?.averageRating || 0;
        this.totalreview = res.summary?.totalReviews || 0;
      },
      error: () => {
        this.avgrating = this.rating.length ? Number((this.rating.reduce((a, b) => a + b, 0) / this.rating.length).toFixed(1)) : 0;
        this.totalreview = this.rating.length;
      }
    });
  }
}
