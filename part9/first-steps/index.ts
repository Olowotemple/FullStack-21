import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (!weight || isNaN(+weight) || !height || isNaN(+height)) {
    return res.json({
      error: 'malformatted parameters',
    });
  }

  return res.json({
    weight,
    height,
    bmi: calculateBmi(+weight, +height),
  });
});

app.post('/exercise', (req, res) => {
  const { daily_exercises, target } = <ExerciseBody>req.body;

  if (!target || !daily_exercises) {
    return res.json({
      error: 'parameters missing',
    });
  }

  if (
    isNaN(target) ||
    daily_exercises.map((exer) => isNaN(exer)).includes(true)
  ) {
    return res.json({
      error: 'malformatted parameters',
    });
  }

  return res.json(calculateExercises(target, daily_exercises));
});

app.listen(4000, () => void console.log('🚀Server is listening on PORT 4000'));

interface ExerciseBody {
  daily_exercises: number[];
  target: number;
}
