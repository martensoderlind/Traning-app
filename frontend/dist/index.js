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
const dateInput = document.querySelector("#date");
const distanceInput = document.querySelector("#distance");
const timeInput = document.querySelector("#time");
const tableElement = document.querySelector("#placeholder");
const API_URL = "http://localhost:8080";
submitButton.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (!dateInput || !distanceInput || !timeInput)
        return;
    const valuesFromInput = {
        date: dateInput.value,
        duration: timeInput.value,
        distance: distanceInput.value,
    };
    try {
        const response = yield fetch(`${API_URL}/submit`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(valuesFromInput),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const responseMessage = yield response.json();
        console.log(responseMessage);
        addTableRow(responseMessage);
    }
    catch (error) {
        console.error(error.message);
    }
}));
function fetchDbData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = yield response.json();
            console.log({ data });
            data.forEach(addTableRow);
        }
        catch (error) {
            console.log(`Error fetching db data: ${error}`);
        }
    });
}
const createTableCell = (input) => {
    const cellElement = document.createElement("td");
    cellElement.textContent = input;
    return cellElement;
};
function addTableRow(session) {
    if (!tableElement)
        return;
    const newTableRow = document.createElement("tr");
    newTableRow.append(createTableCell(session.date), createTableCell(session.distance.toString()), createTableCell(session.duration));
    tableElement.appendChild(newTableRow);
}
document.addEventListener("DOMContentLoaded", () => {
    fetchDbData();
});
