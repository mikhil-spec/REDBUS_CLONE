import { Component, EventEmitter, Output } from '@angular/core';

export type SortField = 'departure' | 'duration' | 'arrival' | 'rating' | 'fare' | 'seats';

export interface SortEvent {
  field: SortField;
  ascending: boolean;
}

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrl: './sorting-bar.component.css'
})
export class SortingBarComponent {
  @Output() sortChange = new EventEmitter<SortEvent>();

  activeSortField: SortField | null = null;
  isAscending: boolean = true;

  onSort(field: SortField): void {
    if (this.activeSortField === field) {
      this.isAscending = !this.isAscending;
    } else {
      this.activeSortField = field;
      this.isAscending = true;
    }
    this.sortChange.emit({ field: this.activeSortField, ascending: this.isAscending });
  }

  // Legacy helper method alias
  sort(field: any): void {
    this.onSort(field);
  }
}