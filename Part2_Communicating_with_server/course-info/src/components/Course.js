const Course = (props) => {
    return (
      <>
      <Header name={props.name} />
      <Content parts={props.parts} />
      <Total parts={props.parts} />
      </>
    )
  }
  const Header = (props) => {
    return (
      <>
        <h1>{props.name}</h1>
      </>
    );
  };
  
  const Content = ({parts}) => {
    return (
      <>
      {
        parts.map(part=>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )
      }
      </>
    );
  };
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.name} {props.exercises}
        </p>
      </>
    );
  };
  
  const Total = ({parts}) => {
    function sumExercises(array, property) {
      return array.reduce((acc, cur) => {
        const val = cur[property];
        return acc+val;
      }, 0);
    }
    const total = sumExercises(parts, "exercises");
    return (
      <>
      <p>
        Number of exercises{" "}
        {total}
      </p>
      </>
    );
  }

  export default Course;