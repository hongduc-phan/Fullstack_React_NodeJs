import { render } from "@testing-library/react";
import React from "react";
import CharacterCount, { CharacterCountProps } from "./CharacterCount";

const errorProps = {
  error: ["some error text"]
};

const validDataProps: CharacterCountProps = {
  characterCount: 10,
  maxCharacterCount: 300,
  error: []
};

const renderWithProps = (newProps?: Partial<CharacterCountProps>) => {
  return render(<CharacterCount {...validDataProps} {...newProps} />);
};

describe("CharacterCount", () => {
  it("should render passed character & max character counts", async () => {
    const { container } = renderWithProps();
    const spanEl = container.getElementsByTagName("span");

    expect(spanEl).toHaveLength(2);
    expect(spanEl[0]).toHaveTextContent("");
    expect(spanEl[1]).toHaveTextContent("10/300");
  });

  describe("with empty error prop", () => {
    it("should render character count component with inherited text color", () => {
      const { container } = renderWithProps();
      const divEl = container.getElementsByTagName("div");

      expect(divEl).toHaveLength(1);
      expect(divEl[0]).toHaveClass("MuiTypography-colorInherit");
    });
  });

  describe("with error prop with some text", () => {
    it("should render error message", () => {
      const { container } = render(<CharacterCount {...errorProps} />);
      const spanEl = container.getElementsByTagName("span");

      expect(spanEl[0]).toHaveTextContent("some error text");
    });

    it("should render content with error color", () => {
      const { container } = render(<CharacterCount {...errorProps} />);
      expect(container.firstChild).toHaveClass("MuiTypography-colorError");
    });
  });
});
