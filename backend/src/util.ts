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

export function dateControll(todaysDate: string, submitDate: string) {
  const inputDate = new Date(submitDate);
  const today = new Date(todaysDate);
  return inputDate.getTime() <= today.getTime();
}
export function distanceControll(submitDistance: number) {
  return submitDistance > 0;
}
