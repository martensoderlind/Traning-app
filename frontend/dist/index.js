"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const dateInput = document.querySelector("#date");
    const distanceInput = document.querySelector("#distance");
    const timeInput = document.querySelector("#time");
    const valuesFromInput = {
        date: dateInput.value,
        duration: timeInput.value,
        distance: distanceInput.value,
    };
    const placeholderElement = document.querySelector("#placeholder");
    const response = yield fetch("http://localhost:8080/submit", {
        headers: {
            "Content-Type": "text/plain",
        },
        method: "POST",
        body: JSON.stringify(valuesFromInput),
    });
    const responseMessage = yield response.json();
    addTableRow(responseMessage.db[responseMessage.db.length - 1]);
}));
function addTableRow(formData) {
    const tableElement = document.querySelector("#placeholder");
    const newTableRow = document.createElement("tr");
    const newDateInput = document.createElement("td");
    const newDistanceInput = document.createElement("td");
    const newDurationInput = document.createElement("td");
    newDateInput.textContent = JSON.stringify(formData.date);
    newDistanceInput.textContent = JSON.stringify(formData.distance);
    newDurationInput.textContent = JSON.stringify(formData.duration);
    newTableRow.appendChild(newDateInput);
    newTableRow.appendChild(newDistanceInput);
    newTableRow.appendChild(newDurationInput);
    tableElement === null || tableElement === void 0 ? void 0 : tableElement.appendChild(newTableRow);
}
