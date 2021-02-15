import vest, { enforce, test } from "vest";
import enforceExtended from "vest/enforceExtended";

const validate = vest.create("profileSettings", (data, { currentField }) => {
  vest.only(currentField);

  test("email", "Can't be empty", () => {
    enforce(data.email).isNotEmpty();
  });

  if (!vest.draft().hasErrors("email")) {
    test("email", "Invalid email", () => {
      enforceExtended(data.email).isEmail();
    });
  }

  test("currentPassword", "Current password is required", () => {
    enforce(data.currentPassword).isNotEmpty();
  });

  test("newPassword", "Can't be empty", () => {
    enforce(data.newPassword).isNotEmpty();
  });

  if (!vest.draft().hasErrors("newPassword")) {
    test("newPassword", "Must be 8 or more characters with one number and one symbol", () => {
      enforceExtended(data.newPassword).matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    });
  }
});

export default validate;
