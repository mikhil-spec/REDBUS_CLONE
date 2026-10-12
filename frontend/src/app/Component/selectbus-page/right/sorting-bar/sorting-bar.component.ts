import { Component } from '@angular/core';
import { BusFilterService, SortKey } from '../../../../service/bus-filter.service';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrl: './sorting-bar.component.css'
})
export class SortingBarComponent {
  constructor(private state: BusFilterService) {}

  get sortKey(): string {
    return this.state.sortKey;
  }

  sortBy(key: SortKey): void {
    this.state.setSort(key);
  }

  // Shows the direction on the heading that the list is sorted by.
  arrow(key: string): string {
    if (this.state.sortKey !== key) return '';
    return this.state.sortAscending ? ' ▲' : ' ▼';
  }
}
