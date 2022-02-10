import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): PublicPatient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid(), entries: [] };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatient,
};
