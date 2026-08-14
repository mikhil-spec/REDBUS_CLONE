import { Component } from '@angular/core';

export interface TimeFilterMap {
  [key: string]: boolean;
}

export interface BusTypeFilterMap {
  Seater: boolean;
  Sleeper: boolean;
  Ac: boolean;
  Nonac: boolean;
  [key: string]: boolean;
}

export interface SideFilterValues {
  livetracking: boolean;
  reschedulable: boolean;
  departuretime: TimeFilterMap;
  bustype: BusTypeFilterMap;
  arrivaltime: TimeFilterMap;
  amenities: TimeFilterMap;
}

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrl: './left.component.css'
})
export class LeftComponent {
  readonly amenityIcon: { [key: string]: string } = {
    wifi: 'wifi',
    waterBottle: 'local_drink',
    blankets: 'hotel',
    chargingPoint: 'battery_charging_full',
    movie: 'movie'
  };

  sideFilterValues: SideFilterValues = {
    livetracking: false,
    reschedulable: false,
    departuretime: {
      'Before 6 am': false,
      '6 am to 12 pm': false,
      '12 pm to 6 pm': false,
      'After 6 pm': false
    },
    bustype: {
      Seater: false,
      Sleeper: false,
      Ac: false,
      Nonac: false
    },
    arrivaltime: {
      'Before 6 am': false,
      '6 am to 12 pm': false,
      '12 pm to 6 pm': false,
      'After 6 pm': false
    },
    amenities: {
      wifi: false,
      waterBottle: false,
      blankets: false,
      chargingPoint: false,
      movie: false
    }
  };

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  handleLiveTrackingClick(): void {
    this.sideFilterValues.livetracking = !this.sideFilterValues.livetracking;
  }

  handleRescheduleClick(): void {
    this.sideFilterValues.reschedulable = !this.sideFilterValues.reschedulable;
  }

  handleDepartureTimeClick(event: Event, name: string): void {
    const target = event.target as HTMLInputElement;
    this.sideFilterValues.departuretime[name] = target.checked;
  }

  handleArrivalTimeClick(event: Event, name: string): void {
    const target = event.target as HTMLInputElement;
    this.sideFilterValues.arrivaltime[name] = target.checked;
  }

  handleBusTypeClick(event: Event, name: string): void {
    const target = event.target as HTMLInputElement;
    this.sideFilterValues.bustype[name] = target.checked;
  }

  // Legacy Property and Method Aliases for backwards compatibility
  get sidefiltervalues(): SideFilterValues {
    return this.sideFilterValues;
  }

  getobjectkey(obj: any): string[] {
    return this.getObjectKeys(obj);
  }

  handlelivetrackingclick(): void {
    this.handleLiveTrackingClick();
  }

  handlerescheduleclick(): void {
    this.handleRescheduleClick();
  }

  handledeparturetimeclick(event: any, name: string): void {
    this.handleDepartureTimeClick(event, name);
  }

  handlearivaltimeclick(event: any, name: string): void {
    this.handleArrivalTimeClick(event, name);
  }

  handlebustypeclick(event: any, name: string): void {
    this.handleBusTypeClick(event, name);
  }
}