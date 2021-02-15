import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import { longTitleText, quiteLongMainText, veryLongElaborationText } from "utils/randomText";
import { defaultSparkFormState } from "../CreateNewSpark/CreateNewSpark";
import CreateSparkPlain, { CreateSparkPlainProps } from "./CreateSparkPlain";

const props: CreateSparkPlainProps = {
  initialFormState: defaultSparkFormState,
  sparkBgImage: "spark-img-url",
  handlePublishClick: jest.fn(),
  ignites: [
    {
      id: "knowtypes",
      ignites: [
        {
          id: "aesthetic",
          usageCount: 5
        }
      ]
    }
  ]
};

const pathWithSparkmapIdParams = "/mock-route/mock-sparkmap-id";

const renderWithProps = (newProps?: Partial<CreateSparkPlainProps>, path = pathWithSparkmapIdParams) => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return render(
    <Router history={history}>
      <Route path="/mock-route/:sparkId">
        <CreateSparkPlain {...props} {...newProps} />
      </Route>
    </Router>
  );
};

describe("CreateSparkPlain", () => {
  describe("when spark form is filled with Valid length data", () => {
    it("should render title field as per user input", () => {
      const { getByLabelText, getByTestId } = renderWithProps();

      const titleInputEl = getByLabelText("title-text");

      // Select title field & simulate user typing valid input
      userEvent.click(titleInputEl);
      userEvent.type(titleInputEl, "Some title text");

      expect(titleInputEl).toHaveAttribute("value", "Some title text");
      expect(getByTestId("character-count")).toHaveTextContent("15/50");
    });

    it("should render main field as per user input", () => {
      const { getByLabelText, getByTestId } = renderWithProps();

      const mainInputEl = getByLabelText("main-text");

      // Select main field & simulate user typing valid input
      userEvent.click(mainInputEl);
      userEvent.type(mainInputEl, "Some main text with valid length");

      expect(mainInputEl).toHaveAttribute("value", "Some main text with valid length");
      expect(getByTestId("character-count")).toHaveTextContent("32/300");
    });

    it("should render elaboration field as per user input", () => {
      const { getByLabelText, getByTestId } = renderWithProps();

      const elaborationInputEl = getByLabelText("elaboration-text");

      // Select elaboration field & simulate user typing valid input
      userEvent.paste(elaborationInputEl, "Some elaboration text. Can be upto 3000 characters");

      expect(elaborationInputEl).toHaveTextContent("Some elaboration text. Can be upto 3000 characters");
      expect(getByTestId("character-count")).toHaveTextContent("50/3000");
    });
  });

  describe("when Spark form is filled with invalid character length", () => {
    it("should render maximum length error in fields exceeding maximum length", () => {
      const { getByLabelText, getAllByTestId } = renderWithProps();

      const titleInputEl = getByLabelText("title-text");
      const mainInputEl = getByLabelText("main-text");
      const elaborationInputEl = getByLabelText("elaboration-text");

      userEvent.click(titleInputEl);
      userEvent.type(titleInputEl, longTitleText);

      // Switch to main text field
      userEvent.tab();
      expect(mainInputEl).toHaveFocus();
      userEvent.paste(mainInputEl, quiteLongMainText);

      // Switch to elaboration text field
      userEvent.tab();
      expect(elaborationInputEl).toHaveFocus();
      userEvent.paste(elaborationInputEl, veryLongElaborationText);

      const [titleCharCount, mainCharCount, elaborationCharCount] = getAllByTestId("character-count");
      expect(titleCharCount).toHaveTextContent("The title is too long");
      expect(mainCharCount).toHaveTextContent("The main point is too long");
      expect(elaborationCharCount).toHaveTextContent("The elaboration is too long");
    });
  });
});
