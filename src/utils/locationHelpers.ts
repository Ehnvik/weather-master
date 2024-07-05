import { IGeoLocations } from "../models/Weather/IGeoLocations";
import { LocationDetails } from "../models/Weather/LocationDetails";

export const createLocationDetailsList = (
  locations: IGeoLocations[],
): LocationDetails[] => {
  const filteredLocations = locations.filter(
    (location: IGeoLocations) =>
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
