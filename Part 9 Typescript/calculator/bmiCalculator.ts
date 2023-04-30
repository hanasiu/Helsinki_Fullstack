//I error-check negative value. but process.argv ignores negative value
interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0 || !height || !weight) 
  throw new Error("not accurate input");
  const bmi: number = weight / (((height / 100) * height) / 100);
  console.log(bmi);
  let result = "";
  if (bmi < 16) result = "Underweight (Severe thinness)";
  else if (bmi < 17) result = "Underweight (Moderate thinness)";
  else if (bmi < 18.5) result = "Underweight (Mild thinness)";
  else if (bmi < 25) result = "Normal range";
  else if (bmi < 30) result = "Overweight (Pre-obese)";
  else if (bmi < 35) result = "Obese (Class I: Severely obese)";
  else if (bmi < 40) result = "Obese (Class II: Very Severely obese)";
  else if (bmi >= 40) result = "Obese (Class III: Most Severely obese)";
  return result;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}


