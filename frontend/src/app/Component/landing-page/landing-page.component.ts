import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { url } from '../../config';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TranslationService } from '../../service/translation.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  fromoption: string = ''
  tooption: string = ''
  date: string = ''
  dateObj: Date | null = null;
  timeSlot: string = '';
  today: Date = new Date();

  faqTabs = [
    { key: 'general', labelKey: 'LANDING.FAQ_TAB_GENERAL' },
    { key: 'ticket', labelKey: 'LANDING.FAQ_TAB_TICKET' },
    { key: 'payment', labelKey: 'LANDING.FAQ_TAB_PAYMENT' },
    { key: 'cancel', labelKey: 'LANDING.FAQ_TAB_CANCEL' },
    { key: 'insurance', labelKey: 'LANDING.FAQ_TAB_INSURANCE' },
  ];
  faqTab = 'general';
  openFaq: number | null = null;
  faqItems = [
    { id: 1, tab: 'ticket', q: 'LANDING.FAQ_Q1', a: 'LANDING.FAQ_A1' },
    { id: 2, tab: 'general', q: 'LANDING.FAQ_Q2', a: 'LANDING.FAQ_A2' },
    { id: 3, tab: 'general', q: 'LANDING.FAQ_Q3', a: 'LANDING.FAQ_A3' },
    { id: 4, tab: 'payment', q: 'LANDING.FAQ_Q4', a: 'LANDING.FAQ_A4' },
    { id: 5, tab: 'payment', q: 'LANDING.FAQ_Q5', a: 'LANDING.FAQ_A5' },
    { id: 6, tab: 'general', q: 'LANDING.FAQ_Q6', a: 'LANDING.FAQ_A6' },
    { id: 7, tab: 'ticket', q: 'LANDING.FAQ_Q7', a: 'LANDING.FAQ_A7' },
    { id: 8, tab: 'cancel', q: 'LANDING.FAQ_Q8', a: 'LANDING.FAQ_A8' },
    { id: 9, tab: 'insurance', q: 'LANDING.FAQ_Q9', a: 'LANDING.FAQ_A9' },
  ];

  get visibleFaqs() {
    return this.faqItems.filter((item) => item.tab === this.faqTab);
  }

  setFaqTab(tab: string): void {
    this.faqTab = tab;
    this.openFaq = null;
  }

  toggleFaq(id: number): void {
    this.openFaq = this.openFaq === id ? null : id;
  }
  fromCities: string[] = [];
  toCities: string[] = [];
  private routePairs: { departure: string; destination: string }[] = [];

  constructor(private router: Router, public dialog: MatDialog, private i18n: TranslationService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`${url}/api/routes/pairs`).subscribe({
      next: (res) => {
        this.routePairs = res?.data || [];
        const departures = [...new Set(this.routePairs.map((p) => p.departure))].sort();
        this.fromCities = departures.map((city) => this.cap(city));
      },
      error: () => { this.routePairs = []; this.fromCities = []; },
    });
  }

  private cap(city: string): string {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }
  fromEvent(option: string) {
    this.fromoption = option;
    const from = option.toLowerCase();
    const destinations = [...new Set(this.routePairs.filter((p) => p.departure === from).map((p) => p.destination))].sort();
    this.toCities = destinations.map((city) => this.cap(city));
    if (this.tooption && !this.toCities.includes(this.tooption)) {
      this.tooption = '';
    }
  }
  toEvent(option: string) {
    this.tooption = option;
  }
  matchDate(event: any) {
    this.dateObj = event.value ? new Date(event.value) : null;
    if (event.value) {
      const date = new Date(event.value);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      this.date = `${year}-${month}-${day}`;
    } else {
      this.date = 'null';
    }
    console.log(this.date)
  }
  submit() {
    if (!this.fromoption || !this.tooption || !this.date) {
      alert(this.i18n.translate('LANDING.ALERT_FILL'));
      return;
    }
    if (this.fromoption === this.tooption) {
      alert(this.i18n.translate('LANDING.ALERT_SAME_CITY'));
      return;
    }
    this.router.navigate(['/select-bus'], {
      queryParams: {
        departure: this.fromoption,
        arrival: this.tooption,
        date: this.date,
        ...(this.timeSlot ? { time: this.timeSlot } : {}),
      },
    });
  }
}
