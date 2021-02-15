import { isValid, parseISO } from "date-fns";
import { enforce } from "vest";

const isValidDate = (input: string) => enforce(isValid(parseISO(input))).isTruthy();

export default isValidDate;
