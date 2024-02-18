import {Dispatch, SetStateAction, useCallback, useState} from "react";

type ReturnTypes = [boolean, Dispatch<SetStateAction<boolean>>, () => void]
const useToggleState = (initialValue: boolean): ReturnTypes => {
  const [value, setValue] = useState(initialValue);
  const onClickToggle = useCallback((value: Boolean  | null = null) => {
    setValue((prev) => !prev)
  }, []);
  return [value, setValue, onClickToggle]
}

export default useToggleState;