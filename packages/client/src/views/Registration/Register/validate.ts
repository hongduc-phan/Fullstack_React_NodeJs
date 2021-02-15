// TODO: Add username & email async validations
import { MIN_AGE_TO_REGISTER } from "types";
import { isDateGreaterThanMinimumRequired } from "validations/validators";
import vest, { enforce, test } from "vest";
import enforceExt from "vest/enforceExtended";

export default vest.create("registration", (data = {}, changedField) => {
  vest.only(changedField);

  test("firstname", "Can't be empty.", () => {
    enforce(data.firstname).isNotEmpty();
  });

  test("lastname", "Can't be empty.", () => {
    enforce(data.lastname).isNotEmpty();
  });

  test("membername", "Minimum 2 and maximum 12 characters. Letters (a-z) and numbers (0-9).", () => {
    enforce(data.membername)
      .longerThan(1)
      .shorterThan(13)
      .matches(/[0-9]?/)
      .matches(/[aA-zZ]{2,}/);
  });

  test("email", "Must be a valid email address.", () => {
    enforceExt(data.email).isEmail();
  });

  test("password", "Strength: Weak", () => {
    enforce(data.password).longerThan(8).matches(/[0-9]/).matches(/[a-z]/).matches(/[A-Z]/);
  });

  test("birthdate", "Can't be empty", () => {
    enforce(data.birthdate).isNotEmpty();
  });

  test("birthdate", `Minimum age for registration is ${MIN_AGE_TO_REGISTER} years`, () => {
    isDateGreaterThanMinimumRequired(data.birthdate);
  });
});
