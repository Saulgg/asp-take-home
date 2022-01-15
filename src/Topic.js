export default function Topic(props) {
  const { name, stargezers, setSearchTerm } = props;
  return (
    <div>
      <span
        className={`${setSearchTerm ? "clickable topic-title" : "topic-title"}`}
        onClick={() => {
          setSearchTerm && setSearchTerm(name);
        }}
        tabIndex={setSearchTerm ? 0 : null}
        onKeyDown={(event) =>
          event.key === "Enter" && setSearchTerm && setSearchTerm(name)
        }
        data-testid={`topic-${name}`}
      >
        {name}
      </span>
      <h3 data-testid={`stargazers-${name}`}>Stargazers: {stargezers}</h3>
    </div>
  );
}
