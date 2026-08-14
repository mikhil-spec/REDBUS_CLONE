import { Component } from '@angular/core';

export interface RouteDialogElement {
  position: number;
  from: string;
  to: string;
  nobus: number;
}

const ELEMENT_DATA: RouteDialogElement[] = [
  { position: 1, from: 'Delhi', to: 'Jaipur', nobus: 2 },
  { position: 2, from: 'Mumbai', to: 'Goa', nobus: 2 },
  { position: 3, from: 'Bangalore', to: 'Mysore', nobus: 2 },
  { position: 4, from: 'Kolkata', to: 'Darjeeling', nobus: 2 },
  { position: 5, from: 'Chennai', to: 'Pondicherry', nobus: 2 },
];

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  displayedColumns: string[] = ['position', 'from', 'to', 'nobus'];
  dataSource = ELEMENT_DATA;
}