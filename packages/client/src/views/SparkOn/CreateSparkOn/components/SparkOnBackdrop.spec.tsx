import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Spark } from "types";

import SparkOnBackdrop from "./SparkOnBackdrop";

const onSparkImageClick = jest.fn();

const props: {
  spark: Pick<Spark, "title" | "description" | "body" | "backgroundImage">;
  onSparkImageClick: () => void;
} = {
  spark: {
    backgroundImage: "some-img-src",
    title: "spark-title-text",
    description: "spark-mainpoint-text",
    body: "spark-elaboration-text"
  },
  onSparkImageClick: onSparkImageClick
};

describe("SparkOnBackdrop component", () => {
  test("should render title,description & body texts", () => {
    const { container } = render(<SparkOnBackdrop {...props} />);

    expect(container).toHaveTextContent("spark-title-text");
    expect(container).toHaveTextContent("spark-mainpoint-text");
    expect(container).toHaveTextContent("spark-elaboration-text");
  });

  test("should render spark image as Card background image", () => {
    const { container } = render(<SparkOnBackdrop {...props} />);

    expect(container.querySelector(".MuiCardMedia-root")).toHaveStyle("background-image: url(some-img-src)");
  });

  test("should fire passed callBack on clicking spark image", () => {
    const { getByLabelText } = render(<SparkOnBackdrop {...props} />);
    const sparkImageEl = getByLabelText("minimize-sparkon-form");

    // Simulate user clicking spark background image
    userEvent.click(sparkImageEl);

    expect(onSparkImageClick).toHaveBeenCalledTimes(1);
  });
});
