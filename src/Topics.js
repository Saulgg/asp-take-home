import Topic from "./Topic";
import { useTopic } from "./queries";

export default function Topics(props) {
  const { searchTerm, setSearchTerm } = props;
  const { data: topic, isFetching, isError, error } = useTopic(searchTerm);

  if (topic) {
    return (
      <>
        <h2>Topic: </h2>
        <Topic name={topic.name} stargezers={topic.stargazerCount} />
        <h2>Related Topics:</h2>
        {topic.relatedTopics?.length ? (
          <div className="related-topics">
            {topic.relatedTopics.map((topic) => (
              <Topic
                key={topic.name}
                name={topic.name}
                stargezers={topic.stargazerCount}
                setSearchTerm={setSearchTerm}
              />
            ))}
          </div>
        ) : (
          <h3>No related topics</h3>
        )}
        {isFetching && <h2 className="loading">Loading...</h2>}
      </>
    );
  } else if (isFetching) {
    return (
      <>
        <h2>Topic: </h2>
        <Topic name={searchTerm} stargezers="Loading..." />
        <h2>Related Topics:</h2>
        Loading...
        {isFetching && <h2 className="loading">Loading...</h2>}
      </>
    );
  } else if (isError) {
    return (
      <div>
        Something went wrong: {error.response.message}, Status code:{" "}
        {error.response.status}
      </div>
    );
  } else {
    return <></>;
  }
}
