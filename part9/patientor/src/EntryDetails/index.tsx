import HealthCheckEntry from '../components/HealthCheckEntry';
import HospitalEntry from '../components/HospitalEntry';
import OccupationalHealthcare from '../components/OccupationalHealthcare';
import { Entry } from '../types';
import { assertNever } from '../utils/helpers';

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
