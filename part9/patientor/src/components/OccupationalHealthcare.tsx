import { Header, Icon, Segment } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as Entry } from '../types';

interface Props {
  entry: Entry;
}

const OccupationalHealthcare = ({ entry }: Props) => {
  const { date, description } = entry;

  return (
    <div>
      <Segment raised style={{ marginBottom: 20 }}>
        <Header as="h3">
          <Header.Content>
            {date}
            <Icon name="stethoscope" style={{ marginLeft: 10 }} />
          </Header.Content>
        </Header>
        <p>
          <i>{description}</i>
        </p>
      </Segment>
    </div>
  );
};

export default OccupationalHealthcare;
