import { deepEqual } from "node:assert";
import { dateControll } from "./util";
import test from "node:test";

test("should return false of submitDate>todaysDate", () => {
  const todaysDate = "2024-10-13";
  const submitDate = "2024-10-14";
  const result = dateControll(todaysDate, submitDate);
  deepEqual(result, false);
});
