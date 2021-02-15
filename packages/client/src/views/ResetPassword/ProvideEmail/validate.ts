import vest, { test } from "vest";
import enforceExt from "vest/enforceExtended";

export default vest.create("provideEmail", (data = {}, changedField) => {
  vest.only(changedField);

  test("email", "Must be a valid email address.", () => {
    enforceExt(data.email).isEmail();
  });
});
