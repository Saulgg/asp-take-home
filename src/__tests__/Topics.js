import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import Topics from "../Topics";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test("Asserts app displays topic name", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Topics searchTerm="react" />
    </QueryClientProvider>
  );
  const topicReact = await screen.findByTestId("topic-react");
  expect(topicReact).toHaveTextContent("react");
});

test("Asserts app displays stargazers count", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Topics searchTerm="react" />
    </QueryClientProvider>
  );
  const stargazersReact = await screen.findByTestId("stargazers-react");
  expect(stargazersReact).toHaveTextContent("Stargazers: 5");
});

test("Asserts clicking a related topic changes the current topic", async () => {
  function TopicWrapper() {
    const [searchTerm, setSearchTerm] = useState("react");
    return <Topics searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
  }
  render(
    <QueryClientProvider client={queryClient}>
      <TopicWrapper />
    </QueryClientProvider>
  );
  // This topic belongs to angular, so we assert it doesn't exist when react topic is active
  const initialTopicRxjsQuery = screen.queryByTestId("topic-rxjs");
  expect(initialTopicRxjsQuery).not.toBeInTheDocument();

  const topicAngular = await screen.findByTestId("topic-angular");
  userEvent.click(topicAngular);

  // New related topics have been set, rxjs should be rendered because of the mock response for angular related topics
  const topicRxjs = await screen.findByTestId("topic-rxjs");
  expect(topicRxjs).toBeInTheDocument();
});
