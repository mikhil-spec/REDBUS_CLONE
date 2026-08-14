import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  departure: string = '';
  arrival: string = '';
  date: string = '';

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.departure = params['departure'] || '';
      this.arrival = params['arrival'] || '';
      this.date = params['date'] || '';
    });
  }
}