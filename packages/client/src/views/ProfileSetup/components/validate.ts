import { COMMON_ERROR_MSG_FOR_DATE_INPUT } from "types";
import { isDateGreaterThanMinimumRequired, isValidDate } from "validations/validators";
import vest, { enforce, group, test } from "vest";
import enforceExtended from "vest/enforceExtended";

const validate = vest.create("profileInfoSection", (data, { currentField, currentTab }) => {
  vest.only(currentField);
  vest.only.group(currentTab);

  group("profile_info_1", () => {
    test("firstname", "First name is required", () => {
      enforce(data.firstname).isNotEmpty();
    });

    test("lastname", "Last name is required", () => {
      enforce(data.lastname).isNotEmpty();
    });

    test("birthdate", "Birth date is required", () => {
      enforce(data.birthdate).isNotEmpty();
    });

    if (!vest.draft().hasErrors("birthdate")) {
      test("birthdate", "Invalid date", () => {
        enforce(isValidDate(data.birthdate));
      });
    }

    if (!vest.draft().hasErrors("birthdate")) {
      test("birthdate", COMMON_ERROR_MSG_FOR_DATE_INPUT, () => {
        isDateGreaterThanMinimumRequired(data.birthdate);
      });
    }

    test("aboutme", "Bio text cannot be more than 1000 characters", () => {
      enforce(data.aboutme.length).lessThan(1000);
    });
  });

  group("profile_info_2", () => {
    test("languages", "Only five languages can be set", () => {
      enforce(data.languages.length).lessThanOrEquals(5);
    });

    test("places", "Only five places can be set", () => {
      enforce(data.places.length).lessThanOrEquals(5);
    });

    test("website", "Invalid weblink", () => {
      enforceExtended(data.website).isURL();
    });
  });
});

export default validate;
