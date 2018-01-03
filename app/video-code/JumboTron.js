//Component
export const JumboTron = ({state}) => {
  const {greeting, whom} = state;

  return (
    <div className="jumbotron">
      <h1>
        {`${greeting} ${whom}`}
      </h1>
      <p>This is rendered using JSX without Virtual DOM</p>
    </div>
  );
}