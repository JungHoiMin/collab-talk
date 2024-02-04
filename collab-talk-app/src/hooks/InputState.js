import {useCallback, useState} from "react";

const useInputState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = useCallback((e) => {
    setValue(e.target.value)
  }, []);
  return [value, setValue, onChangeValue]
}

export default useInputState;