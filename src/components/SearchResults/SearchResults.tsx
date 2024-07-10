import { LocationDetails } from "../../models/Location/Classes/LocationDetails";
import { useWeather } from "../../contexts/WeatherContext";
import "./SearchResults.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLocation } from "../../contexts/LocationContext";
import { useSearchrContext } from "../../contexts/SearchContext";

interface ISearchResultsProp {
  location: LocationDetails;
  onUpdate?: () => void;
}

export const SearchResults = ({ location, onUpdate }: ISearchResultsProp) => {
  const { getLocation } = useWeather();
  const { toggleSearchContainer } = useSearchrContext();
  const { getValue, setValue } = useLocalStorage("locations");
  const { resetSearchResults } = useLocation();

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

  return (
    <div onClick={() => handleSearchForm(location)} className="location">
      <h3 className="location__city">{location.city}</h3>
      <div className="location__details">
        {location.region && (
          <p className="location__region">{location.region}</p>
        )}
        <p className="location__country">{location.country}</p>
      </div>
    </div>
  );
};
