import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import AddEntryFormWrapper from '../AddEntryForm/AddEntryFormWrapper';
import { apiBaseUrl } from '../constants';
import EntryDetails from '../EntryDetails';
import { addPatient, setDiagnosesList, useStateValue } from '../state';
import { Diagnosis, NewEntry, Patient } from '../types';

const SinglePatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | Record<string, never>>({});
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      const patient: Patient | undefined = patients[id];
      const diagnoses = (
        await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      ).data;
      dispatch(setDiagnosesList(diagnoses));

      if (patient) {
        return setPatient(patient);
      }

      const data = (await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`))
        .data;
      dispatch(addPatient(data));
      setPatient(data);
    })().catch((error) =>
      console.error('Something bad happened :(' + String(error))
    );
  }, []);

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async (values: NewEntry): Promise<void> => {
    console.log(values);
    // try {
    //   const newPatient = (
    //     await axios.post<NewEntry, AxiosResponse<Patient>>(
    //       `${apiBaseUrl}/patients/${patient.id}/entries`,
    //       values
    //     )
    //   ).data;

    //   dispatch(updatePatient(newPatient));
    //   setPatient(newPatient);
    // } catch (e: unknown) {
    //   console.error((e as AxiosError).response?.data || 'Unknown Error');
    // }
  };

  if (!Object.keys(patient).length) {
    return null;
  }

  return (
    <Container>
      <Header as="h1">
        <Header.Content>
          {patient.name}
          {patient.gender === 'female' ? (
            <Icon name="venus" />
          ) : (
            <Icon name="mars" />
          )}
        </Header.Content>
      </Header>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <section>
        <h2>entries</h2>
        {patient.entries.length ? (
          patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))
        ) : (
          <p>
            <i>no entries found...</i>
          </p>
        )}
      </section>

      <AddEntryFormWrapper onSubmit={onSubmit} />
    </Container>
  );
};

export default SinglePatientPage;
