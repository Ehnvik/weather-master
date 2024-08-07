import "./SearchLocation.scss";
import { FontAwesomeIcon } from "../../../modules/iconLibrary";
import { LocationDetails } from "../../../models/Location/Classes/LocationDetails";
import { useLocation } from "../../../contexts/LocationContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../../contexts/SearchContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useRemoveLocation } from "../../../hooks/useRemoveLocation";
import { SearchResults } from "../SearchResults/SearchResults";

export const SearchLocation = () => {
  const { toggleSearchContainer } = useSearchContext();
  const { getValue, setValue } = useLocalStorage("locations");
  const { removeLocation } = useRemoveLocation();
  const navigate = useNavigate();

  const {
    locations,
    searchValue,
    setSearchValue: setSearchLocation,
    resetSearchResults,
    setSelectedLocation,
    noLocationsMessage,
    isLoading,
  } = useLocation();

  const [locationHistory, setLocationHistory] = useState<LocationDetails[]>(
    getValue(),
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const searchResultsRef = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchValue = (searchValue: string) => {
    setSearchLocation(searchValue);
  };

  const handleSearchForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue.length > 0 && locations.length > 0) {
      setSelectedLocation(locations[0]);
      updateLocalStorage(locations[0]);
      resetSearchResults();
      toggleSearchContainer();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && locations.length > 0) {
      handleLocationSelect(locations[selectedIndex >= 0 ? selectedIndex : 0]);
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex + 1) % locations.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + locations.length) % locations.length,
      );
    }
  };

  const handleLocationSelect = (selectedLocation: LocationDetails) => {
    setSelectedLocation(selectedLocation);
    updateLocalStorage(selectedLocation);
    resetSearchResults();
    toggleSearchContainer();
    navigate(`/search/${selectedLocation.id}`);
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

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
      setLocationHistory(getValue());
    }
  };

  const handleRemoveLocation = (selectedLocation: LocationDetails) => {
    const currentLocations = getValue();

    const newLocationList = removeLocation(
      currentLocations,
      selectedLocation.id,
    );

    setValue(newLocationList);
    setLocationHistory(newLocationList);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [locations]);

  useEffect(() => {
    searchResultsRef.current?.[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [selectedIndex]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchResults = locations.map(
    (location: LocationDetails, index: number, array: LocationDetails[]) => {
      const isLastItem = index === array.length - 1;
      return (
        searchValue !== "" && (
          <SearchResults
            key={location.id}
            location={location}
            isSelected={index === selectedIndex}
            onSelect={() => handleLocationSelect(location)}
            ref={(element) => (searchResultsRef.current[index] = element)}
            onMouseEnter={() => handleMouseEnter(index)}
            lastItem={isLastItem ? "location__last-item" : ""}
          />
        )
      );
    },
  );

  const searchHistory = [...locationHistory]
    .reverse()
    .map(
      (location: LocationDetails, index: number, array: LocationDetails[]) => {
        const isLastItem = index === array.length - 1;
        return (
          <SearchResults
            key={location.id}
            location={location}
            removeIcon={<FontAwesomeIcon icon={"xmark"} />}
            onSelect={() => handleLocationSelect(location)}
            onRemove={() => handleRemoveLocation(location)}
            lastItem={isLastItem ? "location__last-item" : ""}
          />
        );
      },
    );

  return (
    <div className="search">
      <form
        onSubmit={handleSearchForm}
        className="search__form"
        onKeyDown={handleKeyDown}>
        <input
          className="search__input"
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Location..."
          ref={inputRef}
        />
        <div className="search__icon-container">
          <FontAwesomeIcon className="search__icon" icon="search" />
        </div>
      </form>
      <div className="search__results-container">
        {searchValue === "" && locationHistory.length > 0 && (
          <>
            <div className="search__title-container">
              <FontAwesomeIcon
                className="search__title-icon"
                icon={"clock-rotate-left"}
              />
              <p className="search__title">Search history</p>
            </div>
            {searchHistory}
          </>
        )}
        {isLoading ? (
          <p className="search__loading-message">Loading...</p>
        ) : (
          searchValue !== "" &&
          (searchResults.length > 0
            ? searchResults
            : searchValue.length >= 3 && (
                <p className="search__no-locations-message">
                  {noLocationsMessage}
                </p>
              ))
        )}
      </div>
    </div>
  );
};
