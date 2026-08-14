import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  fromOption: string = '';
  toOption: string = '';
  selectedDate: string = '';
  displayDate: string = 'Date';

  constructor(
    private readonly router: Router,
    public readonly dialog: MatDialog
  ) {}

  fromEvent(option: string): void {
    this.fromOption = option;
  }

  toEvent(option: string): void {
    this.toOption = option;
  }

  matchDate(event: any): void {
    if (event.value) {
      const date = new Date(event.value);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      this.selectedDate = `${year}-${month}-${day}`;
      this.displayDate = `${day}/${month}/${year}`;
    } else {
      this.selectedDate = '';
      this.displayDate = 'Date';
    }
  }

  submit(): void {
    if (!this.fromOption || !this.toOption || !this.selectedDate) {
      alert('Please fill in all details (From, To, and Date)!');
      return;
    }

    const validRoutes: { [key: string]: string } = {
      Delhi: 'Jaipur',
      Mumbai: 'Goa',
      Bangalore: 'Mysore',
      Kolkata: 'Darjeeling',
      Chennai: 'Pondicherry'
    };

    if (validRoutes[this.fromOption] === this.toOption) {
      this.router.navigate(['/select-bus'], {
        queryParams: {
          departure: this.fromOption,
          arrival: this.toOption,
          date: this.selectedDate
        }
      });
    } else {
      this.dialog.open(DialogComponent);
    }
  }

  // Two-way ngModel legacy getters/setters for template compatibility
  get fromoption(): string { return this.fromOption; }
  set fromoption(val: string) { this.fromOption = val; }

  get tooption(): string { return this.toOption; }
  set tooption(val: string) { this.toOption = val; }
}