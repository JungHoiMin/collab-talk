import {KeyboardEvent} from "react";

export const onKeyDownSearchInput = (e: React.KeyboardEvent<HTMLDivElement>, fn: Function) => {
  if (e.key === 'Enter')
    fn();
};