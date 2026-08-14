import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../../../../service/dataservice.service';

export interface PassengerInputDetail {
  name: string;
  age: string;
  gender: string;
}

@Component({
  selector: 'app-bus-booking-form',
  templateUrl: './bus-booking-form.component.html',
  styleUrl: './bus-booking-form.component.css'
})
export class BusBookingFormComponent {
  @Input() selectedSeats: number[] = [];
  @Input() seatPrice: number = 0;
  @Input() routeDetails: any = null;
  @Input() busId: string = '';
  @Input() busArrivalTime: number = 0;
  @Input() busDepartureTime: number = 0;
  @Input() operatorName: string = '';

  passDetails: PassengerInputDetail[] = [];
  passEmail: string = '';
  passPhone: string = '';
  passIsBusiness: boolean = false;
  passInsurance: boolean = false;
  sendUpdates: boolean = false;
  passIsCovid: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly dataService: DataserviceService
  ) {}

  handlePassName(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    this.ensurePassengerIndex(index);
    this.passDetails[index].name = target.value;
  }

  handlePassGender(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    this.ensurePassengerIndex(index);
    this.passDetails[index].gender = target.value;
  }

  handlePassAge(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    this.ensurePassengerIndex(index);
    this.passDetails[index].age = target.value;
  }

  private ensurePassengerIndex(index: number): void {
    if (!this.passDetails[index]) {
      this.passDetails[index] = { name: '', age: '', gender: '' };
    }
  }

  handleProceedToPay(): void {
    if (!this.passEmail || !this.passPhone) {
      alert('Please fill in your contact email and phone number.');
      return;
    }

    const routeParams = {
      operatorname: this.operatorName,
      selectedseat: this.selectedSeats,
      passemail: this.passEmail,
      passphn: this.passPhone,
      passiscoviddonate: this.passIsCovid,
      passisbuisness: this.passIsBusiness,
      passinsurance: this.passInsurance,
      seatprice: this.seatPrice,
      busid: this.busId,
      busarrivaltime: this.busArrivalTime,
      busdeparturetime: this.busDepartureTime
    };

    this.dataService.passObj(this.passDetails);
    this.dataService.sendObj(this.routeDetails);
    this.router.navigate(['/payment'], { queryParams: routeParams });
  }

  // Legacy Property Getters & Setters for Template Backwards Compatibility
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

  get passdetails(): PassengerInputDetail[] { return this.passDetails; }
  get passemail(): string { return this.passEmail; }
  set passemail(val: string) { this.passEmail = val; }

  get passphn(): string { return this.passPhone; }
  set passphn(val: string) { this.passPhone = val; }

  get passisbuisness(): boolean { return this.passIsBusiness; }
  set passisbuisness(val: boolean) { this.passIsBusiness = val; }

  get passinsurance(): boolean { return this.passInsurance; }
  set passinsurance(val: boolean) { this.passInsurance = val; }

  get sendupdates(): boolean { return this.sendUpdates; }
  set sendupdates(val: boolean) { this.sendUpdates = val; }

  get passiscovid(): boolean { return this.passIsCovid; }
  set passiscovid(val: boolean) { this.passIsCovid = val; }

  handleproceedtopay(): void {
    this.handleProceedToPay();
  }
}