import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from '../../service/dataservice.service';
import { BusService } from '../../service/bus.service';
import { Booking } from '../../model/booking.model';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  passSeatArray: any[] = [];
  passFare: number = 0;
  routeDetails: any = null;
  busDepartureTime: number = 0;
  busArrivalTime: number = 0;
  customerId: any = {};
  operatorName: string = '';
  passengerDetails: any[] = [];
  email: string = '';
  phoneNumber: string = '';
  isBusinessTravel: boolean = false;
  isInsurance: boolean = false;
  isCovidDonated: boolean = false;
  busId: string = '';
  bookingDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataserviceService,
    private readonly busService: BusService
  ) {}

  ngOnInit(): void {
    // Listen to query parameters (e.g. /payment?selectedseat=...) or path parameters
    this.route.queryParams.subscribe((queryParams) => {
      this.extractParams(queryParams);
    });

    this.route.params.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.extractParams(params);
      }
    });

    // Subscribe to route search context
    this.dataService.currentData$.subscribe((data) => {
      if (data) {
        this.routeDetails = data;
      }
    });

    // Subscribe to passenger details context
    this.dataService.passData$.subscribe((data) => {
      if (data) {
        this.passengerDetails = data;
      }
    });

    this.getLoggedInUser();
  }

  private extractParams(params: any): void {
    if (!params) return;

    if (params['selectedseat']) {
      this.passSeatArray = Array.isArray(params['selectedseat'])
        ? params['selectedseat']
        : [params['selectedseat']];
    }
    this.email = params['passemail'] || this.email;
    this.phoneNumber = params['passphn'] || this.phoneNumber;
    this.isBusinessTravel = params['passisbuisness'] === 'true' || params['passisbuisness'] === true;
    this.isInsurance = params['passinsurance'] === 'true' || params['passinsurance'] === true;
    this.isCovidDonated = params['passiscoviddonate'] === 'true' || params['passiscoviddonate'] === true;
    this.passFare = Number(params['seatprice']) || this.passFare;
    this.busId = params['busid'] || this.busId;
    this.busArrivalTime = Number(params['busarrivaltime']) || this.busArrivalTime;
    this.busDepartureTime = Number(params['busdeparturetime']) || this.busDepartureTime;
    this.operatorName = params['operatorname'] || this.operatorName;
  }

  getLoggedInUser(): any {
    const loggedInUserJson = sessionStorage.getItem('Loggedinuser');
    if (loggedInUserJson) {
      this.customerId = JSON.parse(loggedInUserJson);
    } else {
      alert('Please log in to continue');
      this.router.navigate(['/']);
    }
    return this.customerId;
  }

  makePayment(): void {
    if (!this.customerId?._id) {
      alert('Please log in before completing the booking.');
      return;
    }

    const date = new Date();
    const formattedBookingDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const myBooking: Partial<Booking> = {
      customerId: this.customerId._id,
      passengerDetails: this.passengerDetails,
      email: this.email || this.customerId.email,
      phoneNumber: this.phoneNumber,
      fare: this.passFare,
      status: 'BOOKED',
      busId: this.busId,
      bookingDate: formattedBookingDate,
      seats: this.passSeatArray,
      departureDetails: {
        city: this.routeDetails?.departureLocation?.name || 'Origin',
        time: this.busDepartureTime,
        date: this.bookingDate
      },
      arrivalDetails: {
        city: this.routeDetails?.arrivalLocation?.name || 'Destination',
        time: this.busArrivalTime,
        date: this.bookingDate
      },
      duration: this.routeDetails?.duration ? `${this.routeDetails.duration} hrs` : 'N/A',
      isBusinessTravel: this.isBusinessTravel,
      isInsurance: this.isInsurance,
      isCovidDonated: this.isCovidDonated
    };

    this.busService.addBooking(myBooking).subscribe({
      next: (response) => {
        alert('Booking successful! Redirecting to your profile...');
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Booking payment failed:', error);
        alert('Payment processing failed. Please try again.');
      }
    });
  }

  // Legacy Property Getters & Setters for template backwards compatibility
  get passseatarray(): any[] { return this.passSeatArray; }
  get passfare(): number { return this.passFare; }
  get routedetails(): any { return this.routeDetails; }
  get busdepauturetime(): number { return this.busDepartureTime; }
  get busarrivaltime(): number { return this.busArrivalTime; }
  get customerid(): any { return this.customerId; }
  get operatorname(): string { return this.operatorName; }
  get bookingdate(): string { return this.bookingDate; }

  makepayment(): void {
    this.makePayment();
  }
}