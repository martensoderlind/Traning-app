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
  newInput.textContent = responseMessage;
  placeholderElement?.appendChild(newInput);
});
