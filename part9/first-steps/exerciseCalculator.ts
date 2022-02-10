interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  dailyExerciseHours: number[]
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours !== 0).length;
  const average =
    dailyExerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target;
  const rating = average < 1 ? 1 : average < target ? 2 : 3;
  const ratingDescription =
    rating < 1
      ? 'loser, you suck!'
      : rating <= 2
      ? 'not too bad but could be better'
      : 'excellent job';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export default calculateExercises;
