import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}: {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name}: {part.exerciseCount}</h3>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name}: {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
          <p>backgroundMaterial: {part.backgroundMaterial}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
