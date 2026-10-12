import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SortKey = 'departure' | 'duration' | 'arrival' | 'rating' | 'fare' | 'seats';

// Departure and arrival time slots, keyed by the labels shown in the filter panel.
const SLOT_RANGES: { [label: string]: [number, number] } = {
  'before 6 am': [0, 5],
  '6 am to 12 pm': [6, 11],
  '12pm to 6 pm': [12, 17],
  'after 6 pm': [18, 23],
};
const SLOT_START: { [name: string]: number } = { early: 0, morning: 6, afternoon: 12, evening: 18 };

// Bus types in each bus-type filter, using the names stored on each bus.
const BUS_TYPE_GROUPS: { [group: string]: string[] } = {
  Seater: ['AC Seater', 'Non-AC Seater'],
  Sleeper: ['AC Sleeper', 'Non-AC Sleeper'],
  Ac: ['AC Seater', 'AC Sleeper', 'Volvo Multi-Axle'],
  Nonac: ['Non-AC Seater', 'Non-AC Sleeper'],
};

function minutesOf(time: string): number {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(time || '').trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : 0;
}

function hourOf(time: string): number {
  return parseInt(String(time || '').split(':')[0], 10);
}

function rangeOf(label: string): [number, number] | null {
  return SLOT_RANGES[label.trim().toLowerCase()] || null;
}

function activeRanges(group: { [label: string]: boolean }): [number, number][] {
  return Object.keys(group)
    .filter((key) => group[key])
    .map(rangeOf)
    .filter((range): range is [number, number] => range !== null);
}

// Holds the sidebar filters and the sort choice. The sidebar changes them, and the bus list reads them.
@Injectable({ providedIn: 'root' })
export class BusFilterService {
  readonly filters: any = {
    livetracking: false,
    reschedulable: false,
    departuretime: { 'before 6 am': false, '6 am to 12 pm': false, '12pm to 6 pm ': false, 'after 6 pm': false },
    arrivaltime: { 'before 6 am': false, '6 am to 12 pm': false, '12pm to 6 pm ': false, 'after 6 pm': false },
    bustype: { Seater: false, Sleeper: false, Ac: false, Nonac: false },
    amenities: { wifi: false, waterBottle: false, blankets: false, chargingPoint: false, movie: false },
  };
  sortKey: SortKey = 'departure';
  sortAscending = true;
  readonly changes = new BehaviorSubject<number>(0);

  notify(): void {
    this.changes.next(this.changes.value + 1);
  }

  reset(): void {
    for (const group of ['departuretime', 'arrivaltime', 'bustype', 'amenities']) {
      for (const key of Object.keys(this.filters[group])) {
        this.filters[group][key] = false;
      }
    }
    this.filters.livetracking = false;
    this.filters.reschedulable = false;
    this.sortKey = 'departure';
    this.sortAscending = true;
    this.notify();
  }

  // Selects one departure slot (used by the home-page time selector).
  setDepartureSlot(name: string): void {
    const start = SLOT_START[name];
    if (start === undefined) return;
    for (const key of Object.keys(this.filters.departuretime)) {
      const range = rangeOf(key);
      this.filters.departuretime[key] = !!range && range[0] === start;
    }
    this.notify();
  }

  // Clicking the same heading again reverses the order.
  setSort(key: SortKey): void {
    if (this.sortKey === key) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortKey = key;
      this.sortAscending = key !== 'rating' && key !== 'seats';
    }
    this.notify();
  }

  // True when a bus passes every filter that is switched on.
  matches(bus: any): boolean {
    const f = this.filters;
    const departures = activeRanges(f.departuretime);
    if (departures.length) {
      const hour = hourOf(bus.departureTime);
      if (!departures.some(([low, high]) => hour >= low && hour <= high)) return false;
    }
    const arrivals = activeRanges(f.arrivaltime);
    if (arrivals.length) {
      const hour = hourOf(bus.arrivalTime);
      if (!arrivals.some(([low, high]) => hour >= low && hour <= high)) return false;
    }
    const groups = Object.keys(f.bustype).filter((key) => f.bustype[key]);
    if (groups.length) {
      const allowed = groups.reduce((types: string[], group) => types.concat(BUS_TYPE_GROUPS[group] || []), []);
      if (!allowed.includes(bus.busTypeName)) return false;
    }
    const wanted = Object.keys(f.amenities).filter((key) => f.amenities[key]);
    if (wanted.some((amenity) => !(bus.amenities || []).includes(amenity))) return false;
    if (f.livetracking && !bus.liveTracking) return false;
    if (f.reschedulable && !bus.reschedulable) return false;
    return true;
  }

  // Orders two buses by the chosen heading. Ties fall back to departure time.
  compare(a: any, b: any): number {
    const direction = this.sortAscending ? 1 : -1;
    const value = (bus: any): number => {
      switch (this.sortKey) {
        case 'duration': return bus.durationHours || 0;
        case 'arrival': return minutesOf(bus.arrivalTime);
        case 'rating': return Number(bus.rating) || 0;
        case 'fare': return bus.displayPrice || 0;
        case 'seats': return bus.seatsLeft || 0;
        default: return minutesOf(bus.departureTime);
      }
    };
    const difference = (value(a) - value(b)) * direction;
    return difference !== 0 ? difference : minutesOf(a.departureTime) - minutesOf(b.departureTime);
  }
}
