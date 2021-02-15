import vest, { test, enforce } from "vest";

export default vest.create("setPassword", (data = {}, changedField) => {
  vest.only(changedField);

  test("password", "Strength: Weak", () => {
    enforce(data.password).longerThan(8).matches(/[0-9]/).matches(/[a-z]/).matches(/[A-Z]/);
  });

  test("confirmPassword", "Passwords do not match", () => {
    enforce(data.confirmPassword).isNotEmpty().equals(data.password);
  });
});
