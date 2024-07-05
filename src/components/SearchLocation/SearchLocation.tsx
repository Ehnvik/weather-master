import "./SearchLocation.scss";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { LocationDetails } from "../../models/Weather/LocationDetails";
import { useLocation } from "../../contexts/LocationContext";
import { SearchResults } from "../SearchResults/SearchResults";

export const SearchLocation = () => {
  const {
    locations,
    searchValue,
    setSearchValue: setSearchLocation,
  } = useLocation();

  const handleSearchValue = (searchValue: string) => {
    setSearchLocation(searchValue);
  };

  const searchResults = locations.map((location: LocationDetails) => {
    return (
      searchValue !== "" && (
        <SearchResults key={location.id} location={location} />
      )
    );
  });

  return (
    <div className="search">
      <form className="search__form">
        <input
          className="search__input"
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Location..."
        />
        <FontAwesomeIcon className="search__icon" icon="search" />
      </form>
      <div className="search__results-container">{searchResults}</div>
    </div>
  );
};
