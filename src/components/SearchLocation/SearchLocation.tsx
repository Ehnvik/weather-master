import { FormEvent, useState } from "react";
import "./SearchLocation.scss";
import { getGeoLocationByName } from "../../services/weatherService";
import { IGeoLocations } from "../../models/Weather/IGeoLocations";
import { FontAwesomeIcon } from "../../modules/iconLibrary";

export const SearchLocation = () => {
  const [locations, setLocations] = useState<IGeoLocations[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const validateSearchInput = (inputValue: string) => {
    if (inputValue.length >= 3) {
      setTimeout(() => {
        getLocations(inputValue);
      }, 1500);
    } else {
      setSearchValue(inputValue);
    }
  };

  const getLocations = async (inputValue: string) => {
    const response = await getGeoLocationByName(inputValue);
    setLocations(response);
    filterUniqueLocations(response);
  };

  const filterUniqueLocations = (locations: IGeoLocations[]) => {
    const set = new Set(locations);
    console.log(set);
  };

  const handleSearchForm = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="search">
      <form onSubmit={handleSearchForm} className="search__form">
        <input
          className="search__input"
          type="text"
          onChange={(e) => validateSearchInput(e.target.value)}
          placeholder="Search Location..."
        />
        <FontAwesomeIcon className="search__icon" icon="search" />
      </form>
      <div className="search__results-container">
        {searchValue !== "" &&
          locations.map((location, index) => (
            <div className="search__result" key={index}>
              <h3 className="search__name">{location.name}</h3>
              <h4 className="search__state">{location.state}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};
