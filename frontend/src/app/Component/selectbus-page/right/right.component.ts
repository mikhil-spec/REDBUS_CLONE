import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService } from '../../../service/bus.service';
import { Bus } from '../../../model/bus.model';
import { Route } from '../../../model/routes.model';
import { BusFilterService } from '../../../service/bus-filter.service';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrl: './right.component.css'
})
export class RightComponent implements OnInit{
 matchedbus:Bus[]=[]
 routes:Route[]=[]
 seats:{[key:string]:any}={}


 departurevar:string=''
 arrival:string=''
 date:string=''
 timeSlot:string=''
 visibleBuses:any[]=[]

 constructor(private route:ActivatedRoute,private busservice:BusService,private state:BusFilterService){}

 getkeys(){
  return Object.keys(this.seats)
 }
 ngOnInit(): void {
   this.state.changes.subscribe(() => this.recompute());
   this.route.queryParams.subscribe(params=>{
    const departure=params['departure'];
    const arrival=params['arrival'];
    const date=params['date'];
    this.departurevar=departure
    this.arrival=arrival
    this.date=date
    this.state.reset();
    this.timeSlot=params['time']||'';
    if (params['time']) { this.state.setDepartureSlot(params['time']); }
   });
   this.busservice.GETBUSDETAILS(this.departurevar,this.arrival,this.date).subscribe((response:any)=>{
    
    this.matchedbus=response.matchedBuses||[];
    this.routes=response.route;
    this.seats=response.busidwithseatobj;
    this.recompute();
    // console.log(this.routes)
   })

 }


 // Applies the filters and the sort, and prepares each bus card: its own duration, displayed price and seats left.
 recompute(): void {
   const buses: any[] = this.matchedbus || [];
   for (const bus of buses) {
     bus.durationHours = this.durationOf(bus);
     bus.routeDetails = { ...(this.routes || {}), duration: bus.durationHours };
     bus.displayPrice = bus.fare || 0;
     const booked = (this.seats && this.seats[bus._id]) || [];
     bus.seatsLeft = Math.max(0, (bus.totalSeats || 0) - booked.length);
   }
   this.visibleBuses = buses.filter((bus) => this.state.matches(bus)).sort((a, b) => this.state.compare(a, b));
 }

 private minutesOf(time: string): number | null {
   const match = /^(\d{1,2}):(\d{2})$/.exec(String(time || '').trim());
   return match ? Number(match[1]) * 60 + Number(match[2]) : null;
 }

 private durationOf(bus: any): number {
   const departure = this.minutesOf(bus.departureTime);
   const arrival = this.minutesOf(bus.arrivalTime);
   return departure === null || arrival === null ? 0 : ((arrival - departure + 1440) % 1440) / 60;
 }

 // Same price formula as the bus card.
 private priceOf(busType: string, hours: number): number {
   const factor = busType === 'standard' ? 50 : busType === 'sleeper' ? 100 : busType === 'A/C Seater' ? 125 : 75;
   return (factor * Math.floor(hours)) / 2;
 }

}
