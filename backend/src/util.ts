import { db } from "./mockDB";
import { DataInput, DbValue } from "./types";

export function addValuesToDB(newInput: DataInput) {
  const newInputId = db.length + 1;
  const newDbValue: DbValue = {
    id: newInputId,
    date: newInput.date,
    duration: newInput.duration,
    distance: newInput.distance,
  };
  db.push(newDbValue);
}
