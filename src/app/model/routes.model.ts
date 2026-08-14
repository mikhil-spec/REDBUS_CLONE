export interface LocationDetail {
  name: string;
  subLocations: string[];
}

export interface Route {
  _id: string;
  departureLocation: LocationDetail;
  arrivalLocation: LocationDetail;
  duration: number;
}