import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import urqlClient from "apollo/urqlClient";
import React from "react";
import { Provider as UrqlProvider } from "urql";
import ImageDialog from "./ImageDialog";

const MockedHandleClose = jest.fn();
const MockedImageSelection = jest.fn();

const props = {
  open: false,
  handleClose: MockedHandleClose,
  handleImageSelection: MockedImageSelection
};

const renderWithProps = (newProps?: any) => {
  return render(
    <UrqlProvider value={urqlClient}>
      <ImageDialog {...props} {...newProps} />
    </UrqlProvider>
  );
};

describe("ImageDialog component", () => {
  describe("Render dialog", () => {
    test("should render dialog if passed prop open=true", () => {
      const { getByLabelText, getByText } = renderWithProps({ open: true });
      expect(getByLabelText("add-image-dialog")).toBeInTheDocument();
      expect(getByText("Add image")).toBeInTheDocument();
    });

    test("should not render dialog if passed prop open=false", () => {
      const { queryByLabelText, queryByText } = renderWithProps();
      expect(queryByLabelText("add-image-dialog")).not.toBeInTheDocument();
      expect(queryByText("Add image")).not.toBeInTheDocument();
    });
  });

  describe("Clicking an option", () => {
    test("should open illustration dialog if clicked 'Select from Hunome'", () => {
      const { getByLabelText, getByText } = renderWithProps({ open: true });

      const SelectImageButtonEl = getByLabelText("select-from-hunome-gallery");

      // fire click event
      userEvent.click(SelectImageButtonEl);

      expect(getByText("Select Image")).toBeInTheDocument();
    });

    test("should call handleClose cb dialog if clicked cancel", () => {
      const { getByLabelText } = renderWithProps({ open: true });

      // fire click event
      userEvent.click(getByLabelText("cancel-image-selection"));

      expect(MockedHandleClose).toHaveBeenCalledTimes(1);
    });
  });
});
