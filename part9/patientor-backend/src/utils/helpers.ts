import { Fields, NewPatient } from '../types';
import {
  parseDate,
  parseEntry,
  parseGender,
  parseName,
  parseOccupation,
  parseSsn,
} from './parsers';

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entry,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [parseEntry(entry)],
  };

  return newPatient;
};
