import "./SearchLocation.scss";
import { FontAwesomeIcon } from "../../modules/iconLibrary";
import { LocationDetails } from "../../models/Location/Classes/LocationDetails";
import { useLocation } from "../../contexts/LocationContext";
import { SearchResults } from "../SearchResults/SearchResults";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const SearchLocation = () => {
  const { getValue } = useLocalStorage("locations");

  const [locationHistory, setLocationHistory] = useState<LocationDetails[]>(
    getValue(),
  );
  const {
    locations,
    searchValue,
    setSearchValue: setSearchLocation,
  } = useLocation();

  const handleSearchValue = (searchValue: string) => {
    setSearchLocation(searchValue);
  };

  useEffect(() => {
    setLocationHistory(getValue());
  }, [getValue]);

  const searchResults = locations.map((location: LocationDetails) => {
    return (
      searchValue !== "" && (
        <SearchResults
          key={location.id}
          location={location}
          onUpdate={() => setLocationHistory(getValue())}
        />
      )
    );
  });

  const searchHistory = [...locationHistory]
    .reverse()
    .map((location: LocationDetails) => {
      return (
        <SearchResults
          key={location.id}
          location={location}
          removeIcon={<FontAwesomeIcon icon={"xmark"} />}
          onUpdate={() => setLocationHistory(getValue())}
        />
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
        <div className="search__icon-container">
          <FontAwesomeIcon className="search__icon" icon="search" />
        </div>
      </form>
      <div className="search__results-container">
        {searchValue === "" && locationHistory.length > 0 && (
          <>
            <div className="search__title-container">
              <p className="search__title">Search history...</p>
            </div>
            {searchHistory}
          </>
        )}
        {searchValue !== "" && searchResults}
      </div>
    </div>
  );
};
