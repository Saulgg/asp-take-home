import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { graphql } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  graphql.query("GetTopic", (req, res, ctx) => {
    const { topicName } = req.variables;
    switch (topicName) {
      case "react":
        return res(
          ctx.data({
            topic: {
              name: "react",
              stargazerCount: "5",
              relatedTopics: [
                {
                  name: "angular",
                  stargazerCount: "1",
                },
              ],
            },
          })
        );
      case "angular":
        return res(
          ctx.data({
            topic: {
              name: "angular",
              stargazerCount: "1",
              relatedTopics: [
                {
                  name: "react",
                  stargazerCount: "5",
                },
                {
                  name: "rxjs",
                  stargazeCount: "6",
                },
              ],
            },
          })
        );
      default:
        return res(
          ctx.data({
            topic: null,
          })
        );
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Asserts app is on the document", () => {
  render(<App />);

  expect(screen.getByTestId("App")).toBeInTheDocument();
});

test("Asserts react is the initial topic", async () => {
  render(<App />);

  const reactTopic = await screen.findByTestId("topic-react");

  expect(reactTopic).toHaveTextContent("react");
});

test("Asserts searching displays searched topic", async () => {
  render(<App />);
  const searchInput = screen.getByTestId("search-input");
  const searchButton = screen.getByTestId("search-button");

  userEvent.type(searchInput, "angular");
  userEvent.click(searchButton);

  // This topic only exists in angular related topics
  const topicRxjs = await screen.findByTestId("topic-rxjs");
  expect(topicRxjs).toHaveTextContent("rxjs");
});
