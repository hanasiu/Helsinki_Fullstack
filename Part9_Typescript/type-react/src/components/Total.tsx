import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      ********************************************************************
      <p>
        <b>Total number of exercises:{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</b>
      </p>
    </div>
  );
};

export default Total;
