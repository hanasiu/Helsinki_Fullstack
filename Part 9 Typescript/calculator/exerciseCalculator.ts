//I error-check negative value. but process.argv ignores negative value
interface exerciseArguments {
  value1: number;
  value2: number[];
}

const parseArguments = (args: string[]): exerciseArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  let value1: number;
  const value2: number[] = [];

  if (!isNaN(Number(args[2]))) {
    value1 = Number(args[2]);
  } else {
    throw new Error("Provided values were not numbers!");
  }
  for (const num of args.slice(3)) {
    if (!isNaN(Number(num))) {
      value2.push(Number(num));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }
  return {
    value1: value1,
    value2: value2
  };
};

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  target: number,
  hourList: number[]
): exerciseResult => {
  if (target <= 0) throw new Error("not appropriate value!");
  let trainingDays = 0;
  let sum = 0;
  for (const hour of hourList) {
    if (hour > 0) ++trainingDays;
    if (hour < 0) throw new Error("not appropriate value!");
    sum += hour;
  }
  const average: number = sum / hourList.length;
  let rating: number;
  let ratingDescription: string;
  if (average >= target) {
    rating = 1;
    ratingDescription = "good";
  } else if (average >= target * 0.7) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else if (average >= target * 0.5) {
    rating = 3;
    ratingDescription = "let's do some more";
  } else {
    rating = 4;
    ratingDescription = "honestly, bad";
  }
  return {
    periodLength: hourList.length,
    trainingDays: trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    average: average,
    target: target
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
