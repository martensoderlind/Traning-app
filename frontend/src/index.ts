import { RunningSession } from "./types";

const submitButton = document.querySelector("#submit") as HTMLButtonElement;
const dateInput = document.querySelector("#date") as HTMLInputElement;
const distanceInput = document.querySelector("#distance") as HTMLInputElement;
const timeInput = document.querySelector("#time") as HTMLInputElement;
const tableElement = document.querySelector("#placeholder") as HTMLTableElement;

const API_URL = "http://localhost:8080";

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!dateInput || !distanceInput || !timeInput) return;

  const valuesFromInput = {
    date: dateInput.value,
    duration: timeInput.value,
    distance: distanceInput.value,
  };

  try {
    const response = await fetch(`${API_URL}/submit`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(valuesFromInput),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const responseMessage = await response.json();
    console.log(responseMessage);
    addTableRow(responseMessage);
  } catch (error: any) {
    console.error(error.message);
  }
});

async function fetchDbData() {
  try {
    const response = await fetch(`${API_URL}/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data: RunningSession[] = await response.json();
    console.log({ data });
    data.forEach(addTableRow);
  } catch (error) {
    console.log(`Error fetching db data: ${error}`);
  }
}

const createTableCell = (input: string): HTMLTableCellElement => {
  const cellElement = document.createElement("td");
  cellElement.textContent = input;
  return cellElement;
};

function addTableRow(session: RunningSession) {
  if (!tableElement) return;
  const newTableRow = document.createElement("tr") as HTMLTableRowElement;
  newTableRow.append(
    createTableCell(session.date),
    createTableCell(session.distance.toString()),
    createTableCell(session.duration)
  );

  tableElement.appendChild(newTableRow);
}
document.addEventListener("DOMContentLoaded", () => {
  fetchDbData();
});
