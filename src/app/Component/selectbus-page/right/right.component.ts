import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService, RouteSearchResponse } from '../../../service/bus.service';
import { Bus } from '../../../model/bus.model';
import { Route } from '../../../model/routes.model';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrl: './right.component.css'
})
export class RightComponent implements OnInit {
  matchedBuses: Bus[] = [];
  routesDetails: Route | any = null;
  seatsMap: { [key: string]: number[] } = {};
  isLoading: boolean = false;

  departureVar: string = '';
  arrival: string = '';
  date: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly busService: BusService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.departureVar = params['departure'] || '';
      this.arrival = params['arrival'] || '';
      this.date = params['date'] || '';

      if (this.departureVar && this.arrival && this.date) {
        this.fetchBusDetails();
      }
    });
  }

  private fetchBusDetails(): void {
    this.isLoading = true;
    this.busService.getBusDetails(this.departureVar, this.arrival, this.date).subscribe({
      next: (response: RouteSearchResponse | any) => {
        this.matchedBuses = response?.matchedBuses || [];
        this.routesDetails = response?.route || null;
        this.seatsMap = response?.busidwithseatobj || {};
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch bus route details:', err);
        this.isLoading = false;
      }
    });
  }

  getFilledSeats(busId: string | undefined): number[] {
    if (!busId) return [];
    return this.seatsMap[busId] || [];
  }

  getKeys(): string[] {
    return Object.keys(this.seatsMap);
  }

  // Legacy Property Getters & Method Aliases for Template Backwards Compatibility
  get matchedbus(): Bus[] { return this.matchedBuses; }
  get routes(): Route | any { return this.routesDetails; }
  get seats(): { [key: string]: any } { return this.seatsMap; }
  get departurevar(): string { return this.departureVar; }

  getkeys(): string[] {
    return this.getKeys();
  }
}