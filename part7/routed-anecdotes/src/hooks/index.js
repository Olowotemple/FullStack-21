import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleReset = () => {
    setValue('');
  };

  return [
    {
      type,
      value,
      onChange,
    },
    handleReset,
  ];
};
