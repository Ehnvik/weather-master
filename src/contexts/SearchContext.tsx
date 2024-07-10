import { createContext, useContext } from "react";

interface ISearchContext {
  isOpen: boolean;
  toggleSearchContainer: () => void;
}

export const SearchContext = createContext<ISearchContext | null>(null);

export const useSearchrContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("Error trying to use context");
  }
  return context;
};
