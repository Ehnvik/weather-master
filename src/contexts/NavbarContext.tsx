import { createContext, useContext } from "react";

interface INavbarContext {
  isOpen: boolean;
  toggleSearchContainer: () => void;
}

export const NavbarContext = createContext<INavbarContext | null>(null);

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("Error trying to use context");
  }
  return context;
};
