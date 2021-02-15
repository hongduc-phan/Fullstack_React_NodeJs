import { differenceInYears } from "date-fns";
import { MIN_AGE_TO_REGISTER } from "types";
import { enforce } from "vest";

const isDateGreaterThanMinimumRequired = (date: string) => {
  enforce(differenceInYears(Date.now(), new Date(date))).greaterThan(MIN_AGE_TO_REGISTER);
};

export default isDateGreaterThanMinimumRequired;
