import { SyntheticEvent, useState } from 'react';
import {
  Divider,
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Form,
} from 'semantic-ui-react';
import AddEntryForm from '.';
import { EntryType, NewEntry } from '../types';

const dropDownOptions: DropdownItemProps[] = Object.keys(EntryType).map(
  (et) => ({
    key: EntryType[et as EntryType],
    value: EntryType[et as EntryType],
    text: et.split(/(?=[A-Z])/).join(' '),
  })
);

interface Props {
  onSubmit: (values: NewEntry) => Promise<void>;
}

const AddEntryFormWrapper = ({ onSubmit }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleChange = (
    _evt: SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    if (value) {
      setEntryType(value as EntryType);
    }
  };

  return (
    <>
      <Form>
        <Form.Field>
          <label>Entry Type</label>

          <Dropdown
            fluid
            selection
            value={entryType}
            onChange={handleChange}
            options={dropDownOptions}
          />
        </Form.Field>

        <Divider />
      </Form>

      <AddEntryForm entryType={entryType} onSubmit={onSubmit} />
    </>
  );
};

export default AddEntryFormWrapper;
