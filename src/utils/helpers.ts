import React from "react";

export const changeHandlerCreator =
<T extends { target: { value: string } }>(
  stateSetter: React.Dispatch<React.SetStateAction<string>>,
  setValidity?:React.Dispatch<React.SetStateAction<boolean>>
) =>
(e: T) => {
  stateSetter(e.target.value);
  if(setValidity) setValidity(true)
};