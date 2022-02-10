import { useField } from 'formik';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import NumberInput from './NumberInput';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 3,
    marginLeft: 12,
    color: '#d73a4a',
  },
});

const FormikNumberInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <NumberInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={String(field.value)}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikNumberInput;
