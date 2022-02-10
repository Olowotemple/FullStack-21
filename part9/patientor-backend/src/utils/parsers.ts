import { isDate, isEntry, isGender, isString } from './typeGuards';
import { Entry, Gender } from '../types';

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date as string}`);
  }
  return date;
};

export const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

export const parseEntry = (entry: unknown): Entry => {
  if (
    !entry ||
    Object.prototype.toString.call(entry) !== '[object Object]' ||
    !Object.keys(entry as Record<string, unknown>).length ||
    !isEntry(entry)
  ) {
    throw new Error('Incorrect or missing entries');
  }
  return entry;
};
