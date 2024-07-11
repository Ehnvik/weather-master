import { LocationDetails } from "../../models/Location/Classes/LocationDetails";
import "./SearchResults.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { forwardRef, ReactNode } from "react";
import { useRemoveLocation } from "../../hooks/useRemoveLocation";

interface ISearchResultsProp {
  location: LocationDetails;
  onUpdate?: () => void;
  removeIcon?: ReactNode;
  isSelected?: boolean;
  onSelect?: () => void;
  onMouseEnter?: () => void;
}

export const SearchResults = forwardRef<HTMLDivElement, ISearchResultsProp>(
  (
    { location, onUpdate, removeIcon, isSelected, onSelect, onMouseEnter },
    ref,
  ) => {
    const { getValue, setValue } = useLocalStorage("locations");
    const { removeLocation } = useRemoveLocation();

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
      <div
        ref={ref}
        className={`location ${isSelected ? "location--selected" : ""}`}
        onClick={onSelect}
        onMouseEnter={onMouseEnter}>
        <div className="location__container">
          <div onClick={onSelect} className="location__details">
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
  },
);
