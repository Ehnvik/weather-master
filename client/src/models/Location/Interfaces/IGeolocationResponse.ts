import { IGeolocationDetails } from "./IGeolocationDetails";

export interface IGeolocationResponse {
  place_id: number;
  lat: string;
  lon: string;
  address: IGeolocationDetails;
}
