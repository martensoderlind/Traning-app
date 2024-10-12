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

  const placeholderElement = document.querySelector(
    "#placeholder"
  ) as HTMLUListElement;

  const newInput = document.createElement("li");
  const response = await fetch("http://localhost:8080/submit", {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(valuesFromInput),
  });
  const responseMessage = await response.json();
  const resp = JSON.stringify(responseMessage.db[0]);
  newInput.textContent = `response from server: ${resp}`;
  // newInput.textContent = `response from server: ${JSON.stringify(
  //   responseMessage
  // )}`;
  placeholderElement?.appendChild(newInput);
});

function addTableRow(formData: any) {
  const tableElement = document.querySelector("#placeholder");

  const newTableRow = document.createElement("tr");
  const newDateInput = document.createElement("td");
  const newDistanceInput = document.createElement("td");
  const newDurationInput = document.createElement("td");
  newDateInput.textContent = formData.date;
  newDistanceInput.textContent = formData.distance;
  newDurationInput.textContent = formData.duration;
  newTableRow.appendChild(newDateInput);
  newTableRow.appendChild(newDistanceInput);
  newTableRow.appendChild(newDurationInput);
  tableElement?.appendChild(newTableRow);
}
