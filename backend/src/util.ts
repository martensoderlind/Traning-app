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
