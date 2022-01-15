import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const endpoint = "https://api.github.com/graphql";

/**
 * Gets Topics using React Query
 * @param {string} searchTerm Term to search by
 */
export function useTopic(searchTerm) {
  return useQuery(["topic", searchTerm.toLowerCase()], async () => {
    const { topic } = await request(
      endpoint,
      gql`
        query GetTopic {
          topic(name: "${searchTerm.toLowerCase()}") {
            name,
            stargazerCount
            relatedTopics(first: 10) {
              name
              stargazerCount
            }
          }
        }
      `,
      {
        topicName: searchTerm.toLowerCase()
      },
      {
        authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    );
    return topic;
  });
}
