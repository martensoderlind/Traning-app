import { mockDB } from "./mockDB";
import { DataInput, DbValue } from "./types";

export function addValuesToDB(newInput: DataInput) {
  const newInputId = mockDB.length + 1;
  const newDbValue: DbValue = {
    id: newInputId,
    date: newInput.date,
    duration: newInput.date,
    distance: newInput.distance,
  };
  mockDB.push(newDbValue);
  console.log({ mockDB });
}
