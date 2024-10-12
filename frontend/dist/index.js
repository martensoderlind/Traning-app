"use strict";
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", (e) => {
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
    const placeholderElement = document.querySelector("#placeholder");
    const newInput = document.createElement("li");
    newInput.textContent = `date: ${valuesFromInput.date}, duration: ${valuesFromInput.duration}, distance: ${valuesFromInput.distance}`;
    placeholderElement === null || placeholderElement === void 0 ? void 0 : placeholderElement.appendChild(newInput);
});
