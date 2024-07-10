import { LocationDetails } from "../../models/Location/Classes/LocationDetails";
import { useWeather } from "../../contexts/WeatherContext";
import "./SearchResults.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLocation } from "../../contexts/LocationContext";
import { useSearchrContext } from "../../contexts/SearchContext";
import { ReactNode } from "react";
import { useRemoveLocation } from "../../hooks/useRemoveLocation";

interface ISearchResultsProp {
  location: LocationDetails;
  onUpdate?: () => void;
  removeIcon?: ReactNode;
}

export const SearchResults = ({
  location,
  onUpdate,
  removeIcon,
}: ISearchResultsProp) => {
  const { getLocation } = useWeather();
  const { toggleSearchContainer } = useSearchrContext();
  const { getValue, setValue } = useLocalStorage("locations");
  const { resetSearchResults } = useLocation();
  const { removeLocation } = useRemoveLocation();

  const updateLocalStorage = (selectedLocation: LocationDetails) => {
    const currentLocations: LocationDetails[] = getValue();
    const isLocationExists: boolean = currentLocations.some((location) => {
      return location.id === selectedLocation.id;
    });

    if (!isLocationExists) {
      const newLocationsList = [...currentLocations, selectedLocation];
      if (newLocationsList.length > 4) {
        newLocationsList.shift();
      }
      setValue(newLocationsList);
      if (onUpdate) {
        onUpdate();
      }
    }
  };

  const handleSearchForm = (selectedLocation: LocationDetails) => {
    getLocation(selectedLocation);
    updateLocalStorage(selectedLocation);
    resetSearchResults();
    toggleSearchContainer();
  };

  const handleRemoveLocation = (selectedLocation: LocationDetails) => {
    const currentLocations = getValue();
    const newLocationList = removeLocation(
      currentLocations,
      selectedLocation.id,
    );
    setValue(newLocationList);
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <div className="location">
      <div className="location__container">
        <div
          onClick={() => handleSearchForm(location)}
          className="location__details">
          <h3 className="location__city">{location.city}</h3>
          <div className="location__sub-details">
            {location.region && (
              <p className="location__region">{location.region}</p>
            )}
            <p className="location__country">{location.country}</p>
          </div>
        </div>
      </div>
      {removeIcon && (
        <div
          onClick={() => handleRemoveLocation(location)}
          className="location__remove-icon">
          {removeIcon}
        </div>
      )}
    </div>
  );
};
