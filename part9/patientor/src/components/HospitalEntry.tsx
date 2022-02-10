import { Header, Icon, List, Segment } from 'semantic-ui-react';
import { HospitalEntry as Entry } from '../types';
import { useStateValue } from '../state';

interface Props {
  entry: Entry;
}

const HospitalEntry = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const { date, description, diagnosisCodes } = entry;

  return (
    <div>
      <Segment raised style={{ marginBottom: 20 }}>
        <Header as="h3">
          <Header.Content>
            {date}
            <Icon name="hospital symbol" style={{ marginLeft: 10 }} />
          </Header.Content>
        </Header>
        <p>
          <i>{description}</i>
        </p>

        <List bulleted>
          {diagnosisCodes &&
            diagnosisCodes.map((diagnosisCode) => {
              const code = diagnoses.find(
                (diagnosis) => diagnosis.code === diagnosisCode
              );
              return (
                code && (
                  <List.Item key={code.code}>
                    {code.code} {code.name}
                  </List.Item>
                )
              );
            })}
        </List>
      </Segment>
    </div>
  );
};

export default HospitalEntry;
