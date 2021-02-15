import React from "react";
import { SparkFormStateType } from "types";

export type SparkFormContextType = {
  isValid: boolean;
  values: {
    title: string;
    main: string;
    elaboration: string;
  };
  touched: {
    title: boolean;
    main: boolean;
    elaboration: boolean;
  };
  focused: {
    title: boolean;
    main: boolean;
    elaboration: boolean;
  };
  errors: {
    title: string[];
    main: string[];
    elaboration: string[];
  };
};

export const SparkFormContext = React.createContext<SparkFormStateType>({} as SparkFormContextType);
