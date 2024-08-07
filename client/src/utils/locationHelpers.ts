import { ILocationsResponse } from "../models/Location/Interfaces/ILocationsResponse";
import { LocationDetails } from "../models/Location/Classes/LocationDetails";

export const createLocationDetailsList = (
  locations: ILocationsResponse[],
): LocationDetails[] => {
  const filteredLocations = locations.filter(
    (location: ILocationsResponse) =>
      location.class === "place" || location.class === "boundary",
  );

  const uniqueLocations = new Set();
  const locationDetailsList: LocationDetails[] = [];

  filteredLocations.forEach((location) => {
    const parts = location.display_name.split(", ");
    const city = parts[0] || "";
    const country = parts[parts.length - 1] || "";
    const region = parts.length > 2 ? parts[1] : "";

    const uniqueKey = `${city}-${region}-${country}`;

    if (!uniqueLocations.has(uniqueKey)) {
      uniqueLocations.add(uniqueKey);
      locationDetailsList.push(
        new LocationDetails(
          location.place_id,
          location.lat,
          location.lon,
          city,
          country,
          region,
        ),
      );
    }
  });

  return locationDetailsList;
};
