import { Header, Icon, Segment } from 'semantic-ui-react';
import { HealthCheckEntry as Entry } from '../types';

interface Props {
  entry: Entry;
}

const HealthCheckEntry = ({ entry }: Props) => {
  const { date, description, healthCheckRating: rating } = entry;

  return (
    <div>
      <Segment raised style={{ marginBottom: 20 }}>
        <Header as="h3">
          <Header.Content>
            {date}
            <Icon name="doctor" style={{ marginLeft: 10 }} />
          </Header.Content>
        </Header>
        <p>
          <i>{description}</i>
        </p>

        {rating === 0 ? (
          <Icon name="heart" color="green" />
        ) : rating === 1 ? (
          <Icon name="heart" color="yellow" />
        ) : rating === 2 ? (
          <Icon name="heart" color="orange" />
        ) : (
          <Icon name="heart" color="red" />
        )}
      </Segment>
    </div>
  );
};

export default HealthCheckEntry;
