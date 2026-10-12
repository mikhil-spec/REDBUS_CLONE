import { Component } from '@angular/core';
import { BusFilterService } from '../../../service/bus-filter.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrl: './left.component.css'
})
export class LeftComponent {
  amenityIcon:{[key:string]: string}={
    wifi: 'wifi',
    waterBottle: 'local_drink',
    blankets: 'hotel',
    chargingPoint: 'battery_charging_full',
    movie: 'movie',
  }
  // Same object as the shared filter state, so the bus list follows every change.
  sidefiltervalues:any;

  constructor(private state: BusFilterService) {
    this.sidefiltervalues = this.state.filters;
  }

  getobjectkey(obj:any):string[]{
    return Object.keys(obj);
  }

  handlelivetrackingclick(): void{
    this.sidefiltervalues.livetracking=!this.sidefiltervalues.livetracking;
    this.state.notify();
  }
  handlerescheduleclick():void{
    this.sidefiltervalues.reschedulable=!this.sidefiltervalues.reschedulable;
    this.state.notify();
  }
  handledeparturetimeclick(event:any,name:string):void{
    this.sidefiltervalues.departuretime[name]=event.target.checked;
    this.state.notify();
  }
  handlearivaltimeclick(event:any,name:string):void{
    this.sidefiltervalues.arrivaltime[name]=event.target.checked;
    this.state.notify();
  }
  handlebustypeclick(event:any,name:string):void{
    this.sidefiltervalues.bustype[name]=event.target.checked;
    this.state.notify();
  }
  handleamenityclick(name:string):void{
    this.sidefiltervalues.amenities[name]=!this.sidefiltervalues.amenities[name];
    this.state.notify();
  }
}
