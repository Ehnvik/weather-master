import { FormEvent, useEffect, useState } from "react";
import "./SearchLocation.scss";
import { getGeoLocationByName } from "../../services/weatherService";
import { IGeoLocations } from "../../models/Weather/IGeoLocations";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { useWeather } from "../../contexts/WeatherContext";
import { LocationDetails } from "../../models/Weather/LocationDetails";
import { initialLocationDetails } from "../../initialValues/weather/initialLocationDetails";
import { useLocation } from "../../contexts/LocationContext";

export const SearchLocation = () => {
  const [locations, setLocations] = useState<LocationDetails[]>([]);
  // const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<LocationDetails>(
    initialLocationDetails,
  );

  const { getLocation } = useWeather();
  const { setSearchValue, searchValue } = useLocation();

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     if (searchValue.length >= 3) {
  //       setDebouncedValue(searchValue);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [searchValue]);

  // useEffect(() => {
  //   const getWeatherLocations = async () => {
  //     const response = await getGeoLocationByName(debouncedValue);
  //     createNewLocationsObject(response);
  //   };

  //   getWeatherLocations();
  // }, [debouncedValue]);

  // useEffect(() => {
  //   getLocation(selectedLocation);
  // }, [selectedLocation]);

  // const createNewLocationsObject = (locations: IGeoLocations[]) => {
  //   const filteredLocations = locations.filter(
  //     (location: IGeoLocations) =>
  //       location.class === "place" || location.class === "boundary",
  //   );

  //   console.log(locations);

  //   const locationLists = filteredLocations.map((location) => {
  //     const parts = location.display_name.split(", ");
  //     return new LocationDetails(
  //       location.place_id,
  //       location.lat,
  //       location.lon,
  //       parts[0] || "",
  //       parts[parts.length - 1] || "",
  //       parts.length > 2 ? parts[1] : "",
  //     );
  //   });

  //   setLocations(locationLists);
  // };

  const handleSearchValue = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const handleSearchForm = (
    e: FormEvent,
    selectedLocation: LocationDetails,
  ) => {
    e.preventDefault();
    setSelectedLocation(selectedLocation);
  };

  return (
    <div className="search">
      <form className="search__form">
        <input
          className="search__input"
          type="text"
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Location..."
        />
        <FontAwesomeIcon className="search__icon" icon="search" />
      </form>
      <div className="search__results-container">
        {searchValue !== "" &&
          locations.map((location: LocationDetails) => (
            <div className="search__result" key={location.id}>
              <h3
                className="search__name"
                onClick={(e) => handleSearchForm(e, location)}>
                {location.city}
              </h3>
              {/* <h4 className="search__state">{location.state}</h4> */}
            </div>
          ))}
      </div>
    </div>
  );
};
