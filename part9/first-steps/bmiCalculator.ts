const calculateBmi = (weight: number, height: number): string => {
  const bmi = weight / ((height / 100) * 2);

  if (bmi < 18.5) {
    return 'Underweight';
  }

  if (bmi <= 24.9) {
    return 'Normal (healthy weight)';
  }

  if (bmi <= 29.9) {
    return 'Overweight';
  }

  return 'Obese';
};

export default calculateBmi;
