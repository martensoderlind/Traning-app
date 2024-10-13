import { deepEqual } from "node:assert";
import { dateControll, distanceControll, validation } from "./util";
import test from "node:test";

test("should return false of submitDate>todaysDate", () => {
  const todaysDate = new Date();
  const submitDate = "2024-10-14";
  const result = dateControll(todaysDate, submitDate);
  deepEqual(result, false);
});

test("should return false if submitDistance < 0", () => {
  const result = distanceControll(-1);
  deepEqual(result, false);
});
test("should return true if both distanceControll and dateControll are true", () => {
  const todaysDate = new Date();
  const submitData = {
    date: "2024-10-12",
    distance: 1,
    duration: "50:00",
  };
  const result = validation(submitData, todaysDate);
  deepEqual(result, true);
});
