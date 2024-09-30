import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("the hook must be used inside a provider");
  }
  return context;
};
