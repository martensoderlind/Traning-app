interface RunningSession {
  date: string;
  duration: string;
  distance: number;
}

const submitButton = document.querySelector("#submit") as HTMLButtonElement;

const API_URL = "http://localhost:8080";

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const dateInput = document.querySelector("#date") as HTMLInputElement;
  const distanceInput = document.querySelector("#distance") as HTMLInputElement;
  const timeInput = document.querySelector("#time") as HTMLInputElement;

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
  const tableElement = document.querySelector("#placeholder");

  const newTableRow = document.createElement("tr");
  const newDateInput = document.createElement("td");
  const newDistanceInput = document.createElement("td");
  const newDurationInput = document.createElement("td");
  newDateInput.textContent = session.date;
  newDistanceInput.textContent = session.distance.toString();
  newDurationInput.textContent = session.duration;

  newTableRow.appendChild(newDateInput);
  newTableRow.appendChild(newDistanceInput);
  newTableRow.appendChild(newDurationInput);
  tableElement?.appendChild(newTableRow);
}
document.addEventListener("DOMContentLoaded", () => {
  fetchDbData();
});
