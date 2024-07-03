import { FormEvent, useEffect, useState } from "react";
import "./SearchLocation.scss";
import { getGeoLocationByName } from "../../services/weatherService";
import { IGeoLocations } from "../../models/Weather/IGeoLocations";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { initialLocationCoordinates } from "../../initialValues/weather/initialLocationCoordinates";
import { ILocationCoordinates } from "../../models/Weather/ILocationCoordinates";
import { useWeather } from "../../contexts/WeatherContext";

export const SearchLocation = () => {
  const [locations, setLocations] = useState<IGeoLocations[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [coordinates, setCoordinates] = useState<ILocationCoordinates>(
    initialLocationCoordinates,
  );

  const { getLocationCoordinates } = useWeather();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.length >= 3) {
        setDebouncedValue(searchValue);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const getWeatherLocations = async () => {
      const response = await getGeoLocationByName(debouncedValue);
      sortOutPlacesFromList(response);
    };

    getWeatherLocations();
  }, [debouncedValue]);

  useEffect(() => {
    getLocationCoordinates(coordinates);
  }, [coordinates]);

  const sortOutPlacesFromList = (locations: IGeoLocations[]) => {
    const filteredLocations = locations.filter(
      (location: IGeoLocations) =>
        location.class === "place" || location.class === "boundary",
    );
    const newList = filteredLocations.map((location) => ({
      location: location.display_name,
    }));
    console.log("New List: ", newList);

    let newLocationsList = newList.map((locationObjekt) =>
      locationObjekt.location.split(", "),
    );

    console.log(newLocationsList);

    setLocations(filteredLocations);
  };

  const handleSearchForm = (e: FormEvent, selectedLocation: IGeoLocations) => {
    e.preventDefault();
    console.log(selectedLocation);

    const coordinatesObject = {
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
    };
    setCoordinates(coordinatesObject);
  };

  return (
    <div className="search">
      <form className="search__form">
        <input
          className="search__input"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Location..."
        />
        <FontAwesomeIcon className="search__icon" icon="search" />
      </form>
      <div className="search__results-container">
        {searchValue !== "" &&
          locations.map((location: IGeoLocations) => (
            <div className="search__result" key={location.place_id}>
              <h3
                className="search__name"
                onClick={(e) => handleSearchForm(e, location)}>
                {location.display_name}
              </h3>
              {/* <h4 className="search__state">{location.state}</h4> */}
            </div>
          ))}
      </div>
    </div>
  );
};
