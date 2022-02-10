import { Entry, Gender, HealthCheckRating } from '../types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isEntry = (entry: any): entry is Entry => {
  switch ((entry as Record<string, unknown>).type) {
    case 'HealthCheck':
      return (
        'id' in entry &&
        'description' in entry &&
        'date' in entry &&
        'specialist' in entry &&
        'healthCheckRating' in entry &&
        isHealthCheckRating(
          (entry as Record<string, unknown>).healthCheckRating
        )
      );

    case 'Hospital':
      return (
        'id' in entry &&
        'description' in entry &&
        'date' in entry &&
        'specialist' in entry &&
        'discharge' in entry
      );

    case 'OccupationalHealthcare':
      return (
        'id' in entry &&
        'description' in entry &&
        'date' in entry &&
        'specialist' in entry &&
        'employerName' in entry &&
        'sickleave' in entry
      );

    default:
      return false;
  }
};

export const isHealthCheckRating = (
  healthCheckRating: any //eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};
