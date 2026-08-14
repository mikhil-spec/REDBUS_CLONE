import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-small-seats',
  templateUrl: './small-seats.component.html',
  styleUrl: './small-seats.component.css'
})
export class SmallSeatsComponent {
  @Input() seatNo: number = 0;
  @Input() alreadyBookedSeats: number[] = [];
  @Input() selectedSeats: number[] = [];
  @Output() seatSelected: EventEmitter<number> = new EventEmitter<number>();

  getColor(seatNo: number): string {
    if (this.alreadyBookedSeats.includes(seatNo)) {
      return '#e53e3e'; // Red (Booked)
    } else if (this.selectedSeats.includes(seatNo)) {
      return '#2b6cb0'; // Blue (Selected)
    } else {
      return '#718096'; // Slate Gray (Available)
    }
  }

  handleSeatBooking(seatNo: number): void {
    const targetSeat = seatNo || this.seatNo;
    if (!this.alreadyBookedSeats.includes(targetSeat)) {
      if (this.selectedSeats.includes(targetSeat)) {
        const index = this.selectedSeats.indexOf(targetSeat);
        if (index > -1) {
          this.selectedSeats.splice(index, 1);
        }
      } else {
        this.selectedSeats.push(targetSeat);
      }
      this.seatSelected.emit(targetSeat);
    }
  }

  onClick(): void {
    this.seatSelected.emit(this.seatNo);
  }

  // Legacy Input/Output Aliases & Getters/Setters for Backwards Compatibility
  @Input() set seatno(val: number) { this.seatNo = val; }
  get seatno(): number { return this.seatNo; }

  @Input() set alreadybookedseats(val: number[]) { this.alreadyBookedSeats = val; }
  get alreadybookedseats(): number[] { return this.alreadyBookedSeats; }

  @Input() set selectedseats(val: number[]) { this.selectedSeats = val; }
  get selectedseats(): number[] { return this.selectedSeats; }

  @Output() get seatselected(): EventEmitter<number> { return this.seatSelected; }

  getcolor(seatNo: number): string {
    return this.getColor(seatNo);
  }

  handleseatbooking(seatNo: number): void {
    this.handleSeatBooking(seatNo);
  }

  onclick(): void {
    this.onClick();
  }
}