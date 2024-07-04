import { IGeoLocations } from "../models/Weather/IGeoLocations";
import { LocationDetails } from "../models/Weather/LocationDetails";

export const createLocationDetailsList = (
  locations: IGeoLocations[],
): LocationDetails[] => {
  const filteredLocations = locations.filter(
    (location: IGeoLocations) =>
      location.class === "place" || location.class === "boundary",
  );

  return filteredLocations.map((location) => {
    const parts = location.display_name.split(", ");
    return new LocationDetails(
      location.place_id,
      location.lat,
      location.lon,
      parts[0] || "",
      parts[parts.length - 1] || "",
      parts.length > 2 ? parts[1] : "",
    );
  });
};
