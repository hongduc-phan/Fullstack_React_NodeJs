import React from "react";
import TermsConditionsModal, { TermsConditionsModalProps } from "./TermsConditionsModal";
import { render, fireEvent } from "@testing-library/react";

const props: TermsConditionsModalProps = {
  modalOpenType: "PrivacyPolicy",
  onClose: jest.fn()
};

describe("TermsConditionsModal", () => {
  const renderWithProps = (newProps?: Partial<TermsConditionsModalProps>) => {
    return render(<TermsConditionsModal {...props} {...newProps} />);
  };

  describe("when passed modalOpenType prop", () => {
    it("should render privacy policy text for 'PrivacyPolicy' prop", () => {
      const { getByTestId } = renderWithProps();

      expect(getByTestId("privacy-policy-content")).toBeInTheDocument();
    });

    it("should render terms text for 'Terms' prop", () => {
      const { getByTestId } = renderWithProps({ modalOpenType: "Terms" });
      expect(getByTestId("terms-content")).toBeInTheDocument();
    });

    it("should render Code of Conduct text for 'CodeOfConduct' prop", () => {
      const { getByTestId } = renderWithProps({ modalOpenType: "CodeOfConduct" });
      expect(getByTestId("code-of-conduct-content")).toBeInTheDocument();
    });
  });

  describe("when close button is clicked", () => {
    it.only("should call passed onClose cb", () => {
      const { getByLabelText } = renderWithProps();

      const CloseBtn = getByLabelText("close-terms-conditions-modal");

      fireEvent.click(CloseBtn);

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
