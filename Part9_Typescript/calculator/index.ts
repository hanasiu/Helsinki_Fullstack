/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmi = calculateBmi(height, weight );
    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  } catch (e) {
    res.status(500).send(`${e}`);
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);
  const hourList = req.body.hourList;
  console.log(target);
  console.log(hourList);

  if ( !target || isNaN(target) || !hourList || !Array.isArray(hourList) ) {
    return res.status(400).send({ error: 'not appropriate input'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, hourList);
  return res.send({ result });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
