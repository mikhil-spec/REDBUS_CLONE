import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../../model/booking.model';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrl: './my-trip.component.css'
})
export class MyTripComponent implements OnInit {
  @Input() booking: Booking[] | any = [];

  readonly imageArr = [
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/1087/GW/DL/6fNUIf.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/9365/1087/GW/DL/hDsqel.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/10/411/ST/L/penRe7.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/19449/814/FR/DL/PuizKJ.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/450/OT/L/lejRej.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/54/ST/DL/11XMg2.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/16/OT/L/lejRej.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/4957/54/FR/L/lejRej.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/5483/35/FR/DL/AHGCEp.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/10/54/FR/L/lejRej.jpeg',
    'https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/420/SI/DL/RdzzBG.jpeg'
  ];

  randomimage: string = '';

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.imageArr.length);
    this.randomimage = this.imageArr[randomIndex];
  }

  getBusImage(index: number): string {
    return this.imageArr[index % this.imageArr.length];
  }
}