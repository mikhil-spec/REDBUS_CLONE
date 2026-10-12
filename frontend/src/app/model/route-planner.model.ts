export interface GeoLocation{
  name : string;
  lat : number;
  lng:number
};

export interface WaypointLocation extends GeoLocation{
  id? :string;
  stopDurationMinutes? : number ;
};

export type CongestionSeverity = "LOW"  | "MODERATE" | "HEAVY" ;

export interface TrafficHotspot {
  name :string;
  delayMin:  number;
  severity : CongestionSeverity ;
};

export interface PlannedRouteOption{
  id:string ;
  name : string;
  routeType: "fastest" |"least_traffic" | "scenic";
  isRecommended : boolean;
  distanceKm : number;
  baseDurationMinutes :number;
  trafficDelayMinutes: number;
  totalDurationMinutes : number;
  congestionLevel: CongestionSeverity;
  congestionIndex : number;
  tollCount :number;
  tollCost:number;
  coordinates : [number, number][] ;
  trafficHotspots : TrafficHotspot[];
  // "mapbox" = live provider data; "estimated" = approximate, not live traffic.
  dataSource?: "mapbox" | "estimated";
  dataSourceReason?: string;
}

export interface RoutePlanResponse{
  success : boolean;
  timestamp : string;
  origin :GeoLocation;
  destination : GeoLocation;
  waypoints : WaypointLocation[];
  routes:PlannedRouteOption[];
}

export interface SavedJourneyRoute {
  _id? : string;
  customerId:string;
  routeName : string;
  origin : GeoLocation;
  destination: GeoLocation;
  waypoints : WaypointLocation[];
  preferredRouteType: "fastest" | "least_traffic"| "scenic";
  distanceKm : number;
  estimatedDurationMinutes:number;
  tags?:string[];
  createdAt? : string;
};