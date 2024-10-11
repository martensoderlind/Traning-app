const submitButton = document.querySelector("#submit");

submitButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  const dateInput = document.querySelector("#date");
  const distanceInput = document.querySelector("#distance");
  const timeInput = document.querySelector("#time");

  const valuesFromInput = {
    date: dateInput.value,
    duration: timeInput.value,
    distance: distanceInput.value,
  };
  console.log(valuesFromInput);
});
