import express, { Request } from 'express';
import patientService from '../services/patient';
import { Entry, Fields, PublicPatient } from '../types';
import { toNewPatient } from '../utils/helpers';
// import { parseEntry } from '../utils/parsers';
import { v4 as uuidv4 } from 'uuid';
import { parseEntry } from '../utils/parsers';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.json(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body as Fields);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post(
  '/:id/entries',
  (
    req: Request<
      Record<string, never>,
      PublicPatient | { error: string },
      Entry
    >,
    res
  ) => {
    const { id } = req.params;
    const reqBody = req.body;

    try {
      const patient = patientService.getPatient(id);

      if (!patient) {
        return res.status(404).json({ error: 'user not found' });
      }
      const entry = parseEntry({ ...reqBody, id: uuidv4() });

      patient.entries = patient.entries.concat(entry);
      return res.json(patient);
    } catch (error) {
      let errMessage = 'Something bad happened :(';
      console.error(error);
      errMessage += (error as Error).message;
      throw new Error(errMessage);
    }
  }
);

export default router;
