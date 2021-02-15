import { MIN_AGE_TO_REGISTER } from "types";
import { isDateGreaterThanMinimumRequired, isValidDate } from "validations/validators";
import vest, { enforce, test } from "vest";
import enforceExtended from "vest/enforceExtended";

export default vest.create("editprofile", (data = {}, changedField) => {
  vest.only(changedField);

  test("firstname", "Can't be empty.", () => {
    enforce(data.firstname).isNotEmpty();
  });

  test("birthdate", "Can't be empty", () => {
    enforce(data.birthdate).isNotEmpty();
  });

  if (!vest.draft().hasErrors("birthdate")) {
    test("birthdate", "Invalid date", () => {
      enforce(isValidDate(data.birthdate));
    });
  }

  if (!vest.draft().hasErrors("birthdate")) {
    test("birthdate", `Minimum age to use service is ${MIN_AGE_TO_REGISTER} years`, () => {
      isDateGreaterThanMinimumRequired(data.birthdate);
    });
  }

  test("aboutme", "Can't be empty", () => {
    enforce(data.aboutme).isNotEmpty();
  });

  test("website", "Invalid weblink", () => {
    enforceExtended(data.website).isURL();
  });

  test("places", "Can't be empty.", () => {
    enforce(data.places).isNotEmpty();
  });

  test("languages", "Can't be empty.", () => {
    enforce(data.languages).isNotEmpty();
  });
});
