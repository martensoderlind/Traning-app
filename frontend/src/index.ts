const submitButton = document.querySelector("#submit") as HTMLButtonElement;

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const dateInput = document.querySelector("#date") as HTMLInputElement;
  const distanceInput = document.querySelector("#distance") as HTMLInputElement;
  const timeInput = document.querySelector("#time") as HTMLInputElement;

  const valuesFromInput = {
    date: dateInput.value,
    duration: timeInput.value,
    distance: distanceInput.value,
  };
  console.log(valuesFromInput);

  const placeholderElement = document.querySelector(
    "#placeholder"
  ) as HTMLUListElement;

  const newInput = document.createElement("li");
  newInput.textContent = `date: ${valuesFromInput.date}, duration: ${valuesFromInput.duration}, distance: ${valuesFromInput.distance}`;
  placeholderElement?.appendChild(newInput);
});
