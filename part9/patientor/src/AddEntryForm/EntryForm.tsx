import { Field, Form, Formik } from 'formik';
import { Button, Header } from 'semantic-ui-react';
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryType, NewEntry } from '../types';
import { ValidationSchema } from '.';

interface Props {
  initialValues: NewEntry;
  validationSchema: ValidationSchema;
  onSubmit: (values: NewEntry) => Promise<void>;
}

const EntryForm = ({ initialValues, onSubmit, validationSchema }: Props) => {
  const [{ diagnoses }] = useStateValue();
  console.log(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ dirty, isValid, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {initialValues.type === EntryType.Hospital && (
              <>
                <Header size="small">Discharge</Header>

                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}

            {initialValues.type === EntryType.HealthCheck && (
              <Field
                label="Health Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            {initialValues.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />

                <Header size="small">Sick Leave</Header>

                <Field
                  label="Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}

            <Button
              type="submit"
              floated="right"
              color="green"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;
