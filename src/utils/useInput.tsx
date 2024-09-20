import { useState } from 'react';

export default function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const set = (str: any) => {
    setValue(str);
  };

  return { value, onChange, setValue: set };
}
