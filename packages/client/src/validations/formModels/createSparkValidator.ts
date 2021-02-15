import vest, { enforce, test } from "vest";

const createSparkValidator = vest.create("create_spark_sparkon", (data, { currentField }) => {
  vest.only(currentField);

  test("title", "The title can't be empty", () => {
    enforce(data.title).isNotEmpty();
  });

  test("title", "The title is too long", () => {
    enforce(data.title).shorterThanOrEquals(50);
  });

  test("main", "The main point can't be empty", () => {
    enforce(data.main).isNotEmpty();
  });

  test("main", "The main point is too long", () => {
    enforce(data.main).shorterThanOrEquals(300);
  });

  test("elaboration", "The elaboration is too long", () => {
    enforce(data.elaboration).shorterThanOrEquals(3000);
  });
});

export default createSparkValidator;
