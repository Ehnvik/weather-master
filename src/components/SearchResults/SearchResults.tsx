import { LocationDetails } from "../../models/Location/Classes/LocationDetails";
import { useWeather } from "../../contexts/WeatherContext";
import "./SearchResults.scss";
import { useNavbarContext } from "../../contexts/NavbarContext";

interface ISearchResultsProp {
  location: LocationDetails;
}

export const SearchResults = ({ location }: ISearchResultsProp) => {
  const { getLocation } = useWeather();
  const { toggleSearchContainer } = useNavbarContext();

  const handleSearchForm = (selectedLocation: LocationDetails) => {
    getLocation(selectedLocation);
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
