import { ILocationCoordinates } from "../models/Location/Interfaces/ILocationCoordinates";
import { LocationCoordinates } from "../models/Location/Classes/LocationCoordinates";

const createLocationObject = (
  lat: number,
  lon: number,
): ILocationCoordinates => {
  return new LocationCoordinates(lat.toString(), lon.toString());
};

export const requestGeolocation = (
  successCallback: (location: ILocationCoordinates) => void,
  errorCallback: (location: ILocationCoordinates, error: string) => void,
) => {
  const success = (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = createLocationObject(lat, lon);
    successCallback(location);
  };

  const handleError = () => {
    const defaultLat = 59.33013312944699;
    const defaultLon = 18.063177658357837;
    const location = createLocationObject(defaultLat, defaultLon);
    errorCallback(location, "Unable to retrieve your location");
  };

  if (!navigator.geolocation) {
    const defaultLat = 59.33013312944699;
    const defaultLon = 18.063177658357837;
    const location = createLocationObject(defaultLat, defaultLon);
    errorCallback(location, "Geolocation not supported");
  } else {
    navigator.geolocation.getCurrentPosition(success, handleError);
  }
};
