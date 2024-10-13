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

export function dateControll(todaysDate: Date, submitDate: string) {
  const [year, month, day] = submitDate.split("-").map(Number);
  const inputDate = new Date(year, month - 1, day);
  const today = new Date(todaysDate);
  return inputDate.getTime() <= today.getTime();
}
export function distanceControll(submitDistance: number) {
  return submitDistance > 0;
}

export function validation(session: any, todaysDate: Date) {
  const date = dateControll(todaysDate, session.date);
  const distance = distanceControll(session.distance);
  if (date && distance) {
    return true;
  }
  return false;
}
