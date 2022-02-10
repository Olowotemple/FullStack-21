import { EntryType, NewEntry } from '../types';
import EntryForm from './EntryForm';
import * as Yup from 'yup';

const baseSchema: Yup.SchemaOf<BaseSchema> = Yup.object({
  description: Yup.string().min(12).required(),
  date: Yup.string()
    .matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in the format YYYY-MM-DD')
    .required(),
  specialist: Yup.string().min(6).required(),
  diagnosisCodes: Yup.array().of(Yup.string()),
});

const hospitalSchema: Yup.SchemaOf<HospitalSchema> = baseSchema.concat(
  Yup.object({
    discharge: Yup.object({
      date: Yup.string()
        .matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in the format YYYY-MM-DD')
        .required('discharge date is a required field'),
      criteria: Yup.string()
        .min(12)
        .required('discharge criteria is a required field'),
    }).required(),
  })
);

const healthCheckSchema: Yup.SchemaOf<HealthCheckSchema> = baseSchema.concat(
  Yup.object({
    healthCheckRating: Yup.number()
      .typeError('health check rating must be a number')
      .min(0)
      .max(3)
      .required('Please enter a rating from 0(great) - 3(critical)'),
  })
);

const occupationalHealthCareSchema: Yup.SchemaOf<OccupationalHealthcareSchema> =
  baseSchema.concat(
    Yup.object({
      employerName: Yup.string().min(3).required(),
      sickLeave: Yup.object({
        startDate: Yup.string().matches(
          /\w{4}-\w{2}-\w{2}/,
          'Enter date in the format YYYY-MM-DD'
        ),
        endDate: Yup.string().matches(
          /\w{4}-\w{2}-\w{2}/,
          'Enter date in the format YYYY-MM-DD'
        ),
      }),
    })
  );

const baseInitialValues = {
  description: '',
  date: '',
  specialist: '',
};

const healthCheckInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
};

const occupationalHealthCareIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthcare,
  employerName: '',
  sickLeave: { startDate: '', endDate: '' },
};

const hospitalIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: { date: '', criteria: '' },
};

// these interfaces are used to type the Yup schemas above
interface BaseSchema {
  date: string;
  description: string;
  specialist: string;
}

interface HospitalSchema extends BaseSchema {
  discharge: {
    date: string;
    criteria: string;
  };
}

interface HealthCheckSchema extends BaseSchema {
  healthCheckRating: number;
}

interface OccupationalHealthcareSchema extends BaseSchema {
  employerName: string;
  sickLeave?: {
    startDate?: string;
    endDate?: string;
  };
}

export type ValidationSchema =
  | Yup.SchemaOf<HospitalSchema>
  | Yup.SchemaOf<HealthCheckSchema>
  | Yup.SchemaOf<OccupationalHealthcareSchema>;

interface Props {
  entryType: EntryType;
  onSubmit: (values: NewEntry) => Promise<void>;
}

const AddEntryForm = ({ entryType, onSubmit }: Props) => {
  switch (entryType) {
    case EntryType.Hospital:
      return (
        <EntryForm
          initialValues={hospitalIntitialValues}
          onSubmit={onSubmit}
          validationSchema={hospitalSchema}
        />
      );

    case EntryType.HealthCheck:
      return (
        <EntryForm
          initialValues={healthCheckInitialValues}
          onSubmit={onSubmit}
          validationSchema={healthCheckSchema}
        />
      );

    case EntryType.OccupationalHealthcare:
      return (
        <EntryForm
          initialValues={occupationalHealthCareIntitialValues}
          onSubmit={onSubmit}
          validationSchema={occupationalHealthCareSchema}
        />
      );

    default:
      return null;
  }
};

export default AddEntryForm;
