import { LocationDetails } from "../../../models/Location/Classes/LocationDetails";
import "./SearchResults.scss";
import { forwardRef, ReactNode } from "react";

interface ISearchResultsProp {
  location: LocationDetails;
  removeIcon?: ReactNode;
  isSelected?: boolean;
  onSelect: () => void;
  onMouseEnter?: () => void;
  onRemove?: () => void;
  lastItem: string;
}

export const SearchResults = forwardRef<HTMLDivElement, ISearchResultsProp>(
  (
    {
      location,
      removeIcon,
      isSelected,
      onSelect,
      onMouseEnter,
      onRemove,
      lastItem,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`location ${isSelected ? "location--selected" : ""}`}
        onMouseEnter={onMouseEnter}>
        <div className={`location__container ${lastItem}`}>
          <div onClick={onSelect} className="location__details">
            <h3 className="location__city">{location.city}</h3>
            <div className="location__sub-details">
              {location.region && (
                <p className="location__region">{location.region}</p>
              )}
              <p className="location__country">{location.country}</p>
            </div>
          </div>
          {removeIcon && (
            <div onClick={onRemove} className="location__remove-icon">
              {removeIcon}
            </div>
          )}
        </div>
      </div>
    );
  },
);
