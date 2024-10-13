import { error, time } from "console";

const submitButton = document.querySelector("#submit") as HTMLButtonElement;

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
    const response = await fetch("http://localhost:8080/submit", {
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
