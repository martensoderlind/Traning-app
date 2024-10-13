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
    addTableRow(dateInput.value, timeInput.value, distanceInput.value);
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
    const data = await response.json();
    console.log({ data });
    data.forEach((session: any) => {
      addTableRow(session.date, session.duration, session.distance);
    });
  } catch (error) {
    console.log(`Error fetching db data: ${error}`);
  }
}

function addTableRow(date: string, duration: string, distance: string) {
  const tableElement = document.querySelector("#placeholder");

  const newTableRow = document.createElement("tr");
  const newDateInput = document.createElement("td");
  const newDistanceInput = document.createElement("td");
  const newDurationInput = document.createElement("td");
  newDateInput.textContent = date;
  newDistanceInput.textContent = distance.toString();
  newDurationInput.textContent = duration;

  newTableRow.appendChild(newDateInput);
  newTableRow.appendChild(newDistanceInput);
  newTableRow.appendChild(newDurationInput);
  tableElement?.appendChild(newTableRow);
}
document.addEventListener("DOMContentLoaded", () => {
  fetchDbData();
});
