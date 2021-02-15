import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IllustrationsDialog from "components/IllustrationsDialog";
import React from "react";

const MockedHandleClose = jest.fn();
const MockedImageSelection = jest.fn();

const props = {
  open: false,
  handleClose: MockedHandleClose,
  handleImageSelection: MockedImageSelection
};

const renderWithProps = (newProps?: any) => {
  return render(<IllustrationsDialog {...props} {...newProps} />);
};

describe("IllustrationsDialog component", () => {
  describe("Render dialog", () => {
    test("should render dialog if passed prop open=true", async () => {
      const { getByLabelText, getByText } = renderWithProps({ open: true });
      expect(getByLabelText("select-from-hunome-gallery")).toBeInTheDocument();
      expect(getByText("Select Image")).toBeInTheDocument();
    });

    test("should not render dialog if passed prop open=false", async () => {
      const { queryByLabelText, queryByText } = renderWithProps();
      expect(queryByLabelText("select-from-hunome-gallery")).not.toBeInTheDocument();
      expect(queryByText("Select Image")).not.toBeInTheDocument();
    });
  });

  describe("Render images", () => {
    test("should render list of images, currently 20 static images", () => {
      const { getAllByRole } = renderWithProps({ open: true });
      expect(getAllByRole("img")).toHaveLength(20);
    });
  });

  describe("Clicking an image", () => {
    test("should call handleImageSelection with clicked image source path", () => {
      const { getAllByRole } = renderWithProps({ open: true });
      const imageList = getAllByRole("img");

      // click second image from the list
      userEvent.click(imageList[1]);

      expect(MockedImageSelection).toHaveBeenCalledTimes(1);
      expect(MockedImageSelection).toHaveBeenCalledWith("http://localhost/two.png");
    });
  });

  describe("Clicking Cancel button", () => {
    test("should call handleClose cb", () => {
      const { getByLabelText } = renderWithProps({ open: true });
      const cancelBtnEl = getByLabelText("cancel-selection-from-hunome-gallery");

      expect(cancelBtnEl).toHaveTextContent("Cancel");

      // click cancel button
      userEvent.click(cancelBtnEl);

      expect(MockedHandleClose).toHaveBeenCalledTimes(1);
    });
  });
});
