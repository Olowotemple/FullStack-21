import React from 'react';
import { StyleSheet, TextInput as NativeTextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyles = [
    styles.input,
    style,
    error ? { borderColor: '#d73a4a' } : {},
  ];

  return <NativeTextInput style={textInputStyles} {...props} />;
};

export default TextInput;
