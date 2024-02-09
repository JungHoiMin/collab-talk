import {Dispatch, SetStateAction, useCallback, useState} from "react";

type ReturnTypes<T = any> = [T, Dispatch<SetStateAction<T>>, (e: any) => void]
const useInputState = <T = any>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = useCallback((e: any) => {
    setValue(e.target.value)
  }, []);
  return [value, setValue, onChangeValue]
}

export default useInputState;