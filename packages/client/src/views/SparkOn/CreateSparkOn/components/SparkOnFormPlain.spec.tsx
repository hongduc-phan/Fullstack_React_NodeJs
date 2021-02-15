import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IVestResult } from "vest";
import SparkonFormPlain, { SparkonFormPlainProps } from "./SparkonFormPlain";

const handleFormDialogClickOpen = jest.fn();
const handleFormDialogClose = jest.fn();
const handleImageSelectionOpen = jest.fn();

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
  },
  dirty: {
    title: false,
    main: false,
    elaboration: false
  }
};

const defaultProps = {
  formState: initialFormState,
  handleFormDialogClickOpen: handleFormDialogClickOpen,
  handleFormDialogClose: handleFormDialogClose,
  handleImageSelectionOpen: handleImageSelectionOpen,
  isFormExpanded: false,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  open: true,
  sparkTitle: "previous-spark-title",
  uploadedImagePath: "url-to-image"
};

const renderWithProps = (newProps?: Partial<SparkonFormPlainProps>) => {
  const validationResult = MockedValidationResult;
  return render(<SparkonFormPlain {...defaultProps} {...newProps} validationResult={validationResult} />);
};

describe("SparkonFormPlain", () => {
  beforeAll(() => {
    MockedValidationResult = {
      hasErrors: () => false,
      getErrors: (field: string) => [] as any
    } as ValidationResult;
  });

  describe("with passed valid props", () => {
    it("should render previous spark title", () => {
      const { container } = renderWithProps();
      expect(container.querySelector("h5")).toHaveTextContent("previous-spark-title");
    });

    it("should render card media with spark image", () => {
      const { container } = renderWithProps();
      expect(container.querySelector(".MuiCardMedia-root")).toHaveStyle("background-image: url(url-to-image)");
    });

    it("should render new image selection icon button", () => {
      const { getByLabelText } = renderWithProps();
      expect(getByLabelText("select-new-image")).toBeInTheDocument();
    });

    it("should render title, main point & elaboration input fields", () => {
      const { getByLabelText } = renderWithProps();

      expect(getByLabelText("title-text")).toBeInTheDocument();
      expect(getByLabelText("main-text")).toBeInTheDocument();
      expect(getByLabelText("elaboration-text")).toBeInTheDocument();
    });

    describe("with errors in field", () => {
      beforeAll(() => {
        MockedValidationResult = {
          hasErrors: () => true,
          getErrors: (field: string) => ["there-is-error-in-title-field"] as any
        } as ValidationResult;
      });

      const formStateWithTouchedFields = {
        ...initialFormState,
        touched: { ...initialFormState.touched, main: true }
      };

      it("should render error text with character count for touched fields", () => {
        const { getAllByTestId } = renderWithProps({ formState: formStateWithTouchedFields });
        const characterCountElements = getAllByTestId("character-count");

        expect(characterCountElements).toHaveLength(1);
        expect(characterCountElements[0]).toHaveTextContent("there-is-error-in-title-field");
        expect(characterCountElements[0]).toHaveTextContent("0/300");
      });
    });

    describe("without error in field", () => {
      beforeAll(() => {
        MockedValidationResult = {
          hasErrors: () => false,
          getErrors: (field: string) => [] as any
        } as ValidationResult;
      });

      it("should render character count for focused fields", () => {
        const formStateWithFocusedFields = {
          ...initialFormState,
          touched: { ...initialFormState.touched, elaboration: true },
          focused: { ...initialFormState.touched, elaboration: true }
        };

        const { getAllByTestId } = renderWithProps({ formState: formStateWithFocusedFields });

        const characterCountElements = getAllByTestId("character-count");

        expect(characterCountElements).toHaveLength(1);
        expect(characterCountElements[0]).toHaveTextContent("0/300");
      });
    });

    describe("with dialog & image states & cb props passed", () => {
      it("should not render sparktitle if form not open", () => {
        const { queryByText } = renderWithProps({ open: false });
        expect(queryByText("previous-spark-title")).not.toBeInTheDocument();
      });

      it("should render spark image bg only when open=true & uploadedImagePath is not null/empty", () => {
        const { container } = renderWithProps({ open: true, uploadedImagePath: "some-url" });
        expect(container.querySelector(".MuiCardMedia-root")).toHaveStyle("background-image: url(some-url)");
      });
    });
  });

  describe("with input handlers props passed", () => {
    it("should call handleImageSelectionOpen onclicking new image selection", () => {
      const { getByLabelText } = renderWithProps();

      userEvent.click(getByLabelText("select-new-image"));

      expect(handleImageSelectionOpen).toHaveBeenCalledTimes(1);
    });

    it("should call handleFormDialogClickOpen cb onclicking title field", () => {
      const { getByLabelText } = renderWithProps();

      userEvent.click(getByLabelText("title-text"));

      expect(handleFormDialogClickOpen).toHaveBeenCalledTimes(1);
    });

    it("should call onFocus, onChange & onBlur event handlers from input elements", () => {
      const onFocus = jest.fn();
      const onChange = jest.fn();
      const onBlur = jest.fn();

      const { getByLabelText } = renderWithProps({ onFocus: onFocus, onChange: onChange, onBlur: onBlur });

      const titleInputEl = getByLabelText("title-text");
      const mainPointInputEl = getByLabelText("main-text");

      userEvent.click(titleInputEl);
      expect(titleInputEl).toHaveFocus();

      // simulate user typing into input field
      fireEvent.change(titleInputEl, { target: { value: "some-spark-title" } });
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);

      // switch to main point input field
      userEvent.tab();

      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(mainPointInputEl).toHaveFocus();
    });
  });
});
