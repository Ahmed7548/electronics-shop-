export const changeHandlerCreator =
<T extends { target: { value: string } }>(
  stateSetter: React.Dispatch<React.SetStateAction<string>>
) =>
(e: T) => {
  stateSetter(e.target.value);
};