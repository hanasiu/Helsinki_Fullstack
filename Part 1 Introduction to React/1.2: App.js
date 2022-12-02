//Header, Content, and Total.
const Header = (prop) => {
  return (
    <>
      <h1>{prop.course}</h1>
    </>
  );
};

const Part = (prop) => {
  return (
    <>
      <p>
        {prop.part} {prop.exercises}
      </p>
    </>
  );
};

const Content = (prop) => {
  return (
    <>
      <Part part={prop.part1} exercises={prop.exercises1} />
      <Part part={prop.part2} exercises={prop.exercises2} />
      <Part part={prop.part3} exercises={prop.exercises3} />
    </>
  );
};

const Total = (prop) => {
  return (
    <p>
      Number of exercises {prop.exercises1 + prop.exercises2 + prop.exercises3}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;

