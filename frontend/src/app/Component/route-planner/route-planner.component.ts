import { Component , OnInit,OnDestroy, AfterViewInit} from "@angular/core";
import {RoutePlannerService} from "../../service/route-planner.service";
import{
  GeoLocation,
  WaypointLocation ,
  PlannedRouteOption ,
  SavedJourneyRoute ,
} from "../../model/route-planner.model" ;
import {HttpClient } from "@angular/common/http";
import * as L from 'leaflet';
import { url } from '../../config';


// Bundled map pin. The default Leaflet marker image is not shipped with the app, so markers showed broken images.
function mapPin(color: string): L.Icon {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.3 0 0 6.3 0 14c0 9.6 14 26 14 26s14-16.4 14-26C28 6.3 21.7 0 14 0z" fill="${color}" stroke="#ffffff" stroke-width="2"/><circle cx="14" cy="14" r="5" fill="#ffffff"/></svg>`;
  return L.icon({
    iconUrl: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg),
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -36],
  });
}
@Component({
  selector : "app-route-planner" ,
  templateUrl: "./route-planner.component.html" ,
  styleUrls : ["./route-planner.component.css"],
})
export class RoutePlannerComponent implements OnInit ,AfterViewInit , OnDestroy{
  // leaflet instance
  private map! : L.Map ;
  private routeLayers:L.Polyline[]= [];
  private markerLayers : L.Marker[] = [];

  // form Selection
  originCity ="delhi" ;
  destinationCity = "jaipur";
  waypoints : WaypointLocation[] = [];
  newWaypointInput= '';

  availableCities= ["delhi" ,"gurgaon", "neemrana", "jaipur",  "agra","mathura", "bangalore" ,"kurnool", "anantapur", "hyderabad", "mumbai", "lonavala", "pune" ];

  // Route Calc. state
  suggestedRoutes: PlannedRouteOption[]= [];
  selectedRoute : PlannedRouteOption  | null= null;
  originGeo: GeoLocation |null = null ;
  destinationGeo : GeoLocation | null = null ;
  isLoading= false;

  // comparison & Saved routes
  activeTab : "routes"  |"compare" | "saved" ="routes";
  savedRoutesList :SavedJourneyRoute[] = [];
  showSaveModal= false;
  saveRouteName ="";
  saveRouteTag= 'Daily Travel';

  // live Traffic simulation & Polling
  liveTrafficInterval : any=null;
  isAutoTrafficEnabled =true ;
  lastTrafficUpdate : Date= new Date();

  // User STate
  currentCustomerId = '';
  toastMessage= "";

  constructor(
    private plannerService : RoutePlannerService ,
    private http :HttpClient,
  ) {}


  ngOnInit() : void{
    this.fetchUser() ;
  }

  ngAfterViewInit() :void {
    this.initMap() ;
    this.calculateTripRoutes();
    this.startTrafficPolling();
  }


  ngOnDestroy() : void {
    if( this.liveTrafficInterval) {
      clearInterval(this.liveTrafficInterval );
    }
  }

  private fetchUser() :void{
    const rawUser = sessionStorage.getItem('Loggedinuser');
    if (!rawUser) return;
    try {
      const user = JSON.parse(rawUser);
      this.currentCustomerId = user?._id || '';
      if (this.currentCustomerId) this.loadSavedRoutes();
    } catch {
      this.currentCustomerId = '';
    }
  }

  private initMap() :void {
    this.map= L.map("interactive-route-map" ,{
      center : [28.6139, 77.209],
      zoom : 7 ,
      zoomControl :true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(this.map) ;
  }

  calculateTripRoutes() : void{
    if(!this.originCity ||  !this.destinationCity ) {
      this.triggerToast("Please specify both start location and destination.") ;
      return;
    }


    this.isLoading= true;
    const payload={
      origin : this.originCity ,
      destination : this.destinationCity,
      waypoints : this.waypoints.map(w=> w.name)
    };

    this.plannerService.planJourney(payload).subscribe({
      next:res=>{
        this.suggestedRoutes =  res.routes|| [];
        this.originGeo = res.origin ;
        this.destinationGeo = res.destination;
        // Use the backend's resolved coordinates so map markers match the
        // geocoded waypoint names used to calculate the route.
        this.waypoints = (res.waypoints || []).map((waypoint: WaypointLocation) => ({
          ...waypoint,
          lat: Number(waypoint.lat),
          lng: Number(waypoint.lng),
        }));
        this.selectedRoute= this.suggestedRoutes[0] || null;
        this.renderMapRoutes();
        this.isLoading=false;
        this.lastTrafficUpdate =new Date();
      },
      error:() =>{
        this.isLoading = false;
        this.triggerToast("Unable to compute route plan. Please check backend service.");
      }
    });
  }

  renderMapRoutes() : void{
    // Clear previous Map layers
    this.routeLayers.forEach(l=> this.map.removeLayer(l) );
    this.markerLayers.forEach( m=> this.map.removeLayer(m));
    this.routeLayers= [];
    this.markerLayers =[];

    if(!this.suggestedRoutes.length ||  !this.originGeo || !this.destinationGeo ) return;

    // add origin marker
    const originMarker = L.marker([this.originGeo.lat , this.originGeo.lng], { icon: mapPin('#16a34a') })
      .bindPopup(`<strong>Origin:</strong> ${this.originGeo.name}`)
      .addTo(this.map) ;
    this.markerLayers.push(originMarker);

    // Add waypoints Markers
    this.waypoints.forEach((wp,idx)=> {
      const wpMarker = L.marker([wp.lat,wp.lng], { icon: mapPin('#f59e0b') })
        .bindPopup(`<strong>Waypoint ${idx+1}:</strong> ${wp.name }`)
        .addTo(this.map) ;
      this.markerLayers.push(wpMarker);
    } );

    // Add Destination marker
    const destMarker= L.marker([this.destinationGeo.lat, this.destinationGeo.lng], { icon: mapPin('#dc2626') })
      .bindPopup(`<strong>Destination:</strong> ${this.destinationGeo.name}`)
      .addTo(this.map);
    this.markerLayers.push(destMarker);

    // Draw polylines for alternatives and highlight active route
    const allCoords: [number, number][] = [];

    this.suggestedRoutes.forEach(route => {
      const isSelected =this.selectedRoute?.id === route.id;
      const color = this.getRouteColor(route.congestionLevel ,isSelected);
      const poly= L.polyline(route.coordinates, {
        color ,
        weight: isSelected ? 6 : 3,
        opacity: isSelected ? 0.95:0.45 ,
        dashArray: route.routeType === "scenic" ? '6, 6': undefined
      }).addTo(this.map);

      poly.on("click", ()=> {
        this.selectRoute(route);
      });

      this.routeLayers.push(poly);
      route.coordinates.forEach(c=> allCoords.push(c));
    });

    if(allCoords.length >0) {
      this.map.fitBounds(L.latLngBounds(allCoords) , {padding :[40, 40] });
    }
  }

  selectRoute(route :PlannedRouteOption): void{
    this.selectedRoute= route;
    this.renderMapRoutes();
  }

  getRouteColor(severity : string ,isSelected: boolean) : string{
    if (!isSelected) return "#94a3b8";
    switch (severity) {
      case "LOW" : return '#16a34a'; // Green
      case "MODERATE": return "#eab308"; // Yellow/Amber
      case "HEAVY" : return "#dc2626"; // Red
      default : return "#2563eb";
    }
  }

  addPredefinedWaypoint(cityName:string) :void{
    if ( !cityName) return;
    const exists =this.waypoints.some(w =>w.name.toLowerCase()===cityName.toLowerCase() );
    if (exists ) return;

    this.waypoints.push({
      name : cityName.toUpperCase() ,
      lat : 28.4722,
      lng:77.0725,
      stopDurationMinutes : 15, 
    } ) ;
  }

  addCustomWaypoint() : void{
    const name= this.newWaypointInput.trim();
    if(!name) return;
    this.addPredefinedWaypoint(name);
    this.newWaypointInput = '';
    this.calculateTripRoutes() ;
  }

  removeWaypoint(index :number ) : void{
    this.waypoints.splice(index , 1);
    this.calculateTripRoutes();
  }

  startTrafficPolling() :void {
    this.liveTrafficInterval= setInterval( ()=> {
      if(!this.isAutoTrafficEnabled ||  !this.selectedRoute) return;

      this.plannerService.getLiveTrafficDelta(this.originCity ,this.destinationCity, this.selectedRoute.routeType )
        .subscribe( {
          next: res => {
            if (this.selectedRoute) {
              this.selectedRoute.congestionLevel= res.congestionLevel;
              this.selectedRoute.congestionIndex = res.congestionIndex ;
              this.selectedRoute.trafficDelayMinutes =res.trafficDelayMinutes;
              this.selectedRoute.totalDurationMinutes = res.totalDurationMinutes;
              this.lastTrafficUpdate=new Date();
              this.renderMapRoutes() ;
            }
          }
        } );
    },12000);
  }

  openSaveModal() : void {
    if(!this.selectedRoute) return;
    this.saveRouteName = `${this.originCity.toUpperCase()} to ${this.destinationCity.toUpperCase()} (${this.selectedRoute.name})` ;
    this.showSaveModal= true;
  }

  closeSaveModal():void {
    this.showSaveModal=false;
  }

  saveCurrentRoute(): void {
    if (!this.selectedRoute || !this.originGeo  || !this.destinationGeo) return;

    const payload : SavedJourneyRoute = {
      customerId: this.currentCustomerId ,
      routeName : this.saveRouteName || "Custom Route" ,
      origin : this.originGeo,
      destination: this.destinationGeo,
      waypoints : this.waypoints,
      preferredRouteType:this.selectedRoute.routeType ,
      distanceKm: this.selectedRoute.distanceKm,
      estimatedDurationMinutes:this.selectedRoute.totalDurationMinutes,
      tags : [this.saveRouteTag]
    };


    this.plannerService.saveCustomRoute(payload).subscribe( {
      next: res=> {
        this.triggerToast('Route saved to your profile!');
        this.showSaveModal = false ;
        this.loadSavedRoutes();
      },
      error :()=> this.triggerToast("Failed to save route.")
    });
  }

  loadSavedRoutes() : void{
    if(!this.currentCustomerId) return;
    this.plannerService.getUserSavedRoutes(this.currentCustomerId).subscribe( {
      next: res=> {
        this.savedRoutesList =res.data ||  [];
      }
    });
  }

  applySavedRoute( item:SavedJourneyRoute):void {
    this.originCity= item.origin.name.toLowerCase();
    this.destinationCity = item.destination.name.toLowerCase();
    this.waypoints = item.waypoints || [];
    this.activeTab = 'routes' ;
    this.calculateTripRoutes();
    this.triggerToast(`Loaded saved route: ${item.routeName}`);
  }

  deleteSaved(routeId:string ,event: Event):void {
    event.stopPropagation() ;
    this.plannerService.deleteSavedRoute(routeId, this.currentCustomerId).subscribe( {
      next: ()=>{
        this.savedRoutesList = this.savedRoutesList.filter(r=> r._id !== routeId);
        this.triggerToast('Saved route deleted.');
      }
    });
  }

  formatDuration(minutes: number): string {
    const hrs= Math.floor(minutes / 60);
    const mins = minutes% 60 ;
    return hrs>0 ? `${hrs}h ${mins}m` :`${mins}m`;
  }

  triggerToast(msg : string) : void{
    this.toastMessage= msg;
    setTimeout(() => {
      this.toastMessage = "";
    },4000 );
  }
}