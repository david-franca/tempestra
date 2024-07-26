import { Result } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

interface SelectedItemContextProps {
  selectedItem: Result | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<Result | null>>;
}

const SelectedItemContext = createContext<SelectedItemContextProps | undefined>(
  undefined
);

export const SelectedItemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedItem, setSelectedItem] = useState<Result | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItem = localStorage.getItem("selectedItem");
      if (savedItem) {
        setSelectedItem(JSON.parse(savedItem));
      }
    }
  }, []);

  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    } else {
      localStorage.removeItem("selectedItem");
    }
  }, [selectedItem]);

  const value = useMemo(
    () => ({ selectedItem, setSelectedItem }),
    [selectedItem]
  );

  return (
    <SelectedItemContext.Provider value={value}>
      {children}
    </SelectedItemContext.Provider>
  );
};

export const useSelectedItem = (): SelectedItemContextProps => {
  const context = useContext(SelectedItemContext);
  if (!context) {
    throw new Error(
      "useSelectedItem must be used within a SelectedItemProvider"
    );
  }
  return context;
};
