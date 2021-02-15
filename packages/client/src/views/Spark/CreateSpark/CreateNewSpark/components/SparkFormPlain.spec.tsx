import { render } from "@testing-library/react";
import React from "react";
import { IVestResult } from "vest";
import SparkFormPlain from "./SparkFormPlain";

type ValidationResult = Pick<IVestResult, "hasErrors" | "getErrors">;

let MockedValidationResult: ValidationResult;

const initialFormState = {
  values: {
    title: "",
    main: "",
    elaboration: ""
  },
  touched: {
    title: false,
    main: false,
    elaboration: false
  },
  focused: {
    title: false,
    main: false,
    elaboration: false
  }
};
const onBlur = jest.fn();
const onFocus = jest.fn();
const onChange = jest.fn();

const defaultProps = {
  formState: initialFormState,
  isImageRendered: false,
  onBlur: onBlur,
  onFocus: onFocus,
  onChange: onChange
};

const renderWithProps = (newProps?: any) => {
  const validationResult = MockedValidationResult;
  return render(<SparkFormPlain {...defaultProps} {...newProps} validationResult={validationResult} />);
};

describe("SparkFormPlain", () => {
  describe("with no form errors", () => {
    beforeAll(() => {
      MockedValidationResult = {
        hasErrors: () => false,
        getErrors: (field: string) => [] as any
      } as ValidationResult;
    });

    it("should render form with empty data", () => {
      const { getByLabelText } = renderWithProps();
      expect(getByLabelText("title-text")).toHaveValue("");
      expect(getByLabelText("main-text")).toHaveValue("");
      expect(getByLabelText("elaboration-text")).toHaveValue("");
    });
  });

  describe("with form errors", () => {
    beforeAll(() => {
      MockedValidationResult = {
        hasErrors: () => true,
        getErrors: (field: string) => ["some error message"] as any
      } as ValidationResult;
    });

    it("should render error message for touched field", () => {
      const titleTouched = {
        ...defaultProps,
        formState: {
          ...initialFormState,
          values: { ...initialFormState.values },
          touched: { title: true }
        }
      };

      const { getByTestId } = renderWithProps({ ...titleTouched });

      expect(getByTestId("character-count")).toHaveTextContent("some error message");
    });
  });

  describe("Unicode characters", () => {
    const propsWithUnicodeCharacters = {
      ...defaultProps,
      formState: {
        ...initialFormState,
        values: {
          ...initialFormState.values,
          title: "some title with character 👍",
          main: "👏some perspective text",
          elaboration: "elaboration text with unicode characters 🤓"
        }
      }
    };

    it("should render all fields with unicode characters correctly", () => {
      const { getByLabelText } = renderWithProps({ ...propsWithUnicodeCharacters });

      expect(getByLabelText("title-text")).toHaveValue("some title with character 👍");
      expect(getByLabelText("main-text")).toHaveValue("👏some perspective text");
      expect(getByLabelText("elaboration-text")).toHaveValue("elaboration text with unicode characters 🤓");
    });
  });
});
