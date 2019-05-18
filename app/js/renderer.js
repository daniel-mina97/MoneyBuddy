const {remote} = require('electron');
const SqlDriver = require('./sqlDriver');
const sqlDriver = new SqlDriver(remote.app.getPath('userData'));

document.querySelector("#enter-expense-submit").addEventListener("click", () => {
    document.querySelector("#enter-expense-submit-hidden").click();
});

document.querySelector("#submit-expense").addEventListener("submit", (event) => {
    event.preventDefault();
    let date = event.target[0].value;
    let amount = event.target[1].value;
    let location = event.target[2].value;
    let description = event.target[3].value;
    sqlDriver.enterExpense(date, amount, location, description);
    document.querySelector("#enter-expense-modal").classList.remove("is-active");
});

document.querySelector("#view-expenses-submit").addEventListener("click", () => {
    document.querySelector("#view-expenses-submit-hidden").click();
});

document.querySelector("#view-expenses").addEventListener("submit", (event) => {
    console.log("View submit registered");
    event.preventDefault();
    let startDate = event.target[0].value;
    let endDate = event.target[1].value;
    sqlDriver.getExpenses(startDate, endDate, (rows)=> {
        console.log(rows);
    });
    document.querySelector("#view-expenses-modal").classList.remove("is-active");
});

document.querySelector("#enter-expense-button").addEventListener("click", () => {
    document.querySelector("#form-date-submit").valueAsDate = new Date();
    document.querySelector("#enter-expense-modal").classList.add("is-active");
});

document.querySelector("#enter-expense-cancel").addEventListener("click", () => {
    document.querySelector("#enter-expense-modal").classList.remove("is-active");
});

document.querySelector("#view-expenses-button").addEventListener("click", () => {
    document.querySelector("#view-expenses-modal").classList.add("is-active");
});

document.querySelector("#view-expenses-cancel").addEventListener("click", () => {
    document.querySelector("#view-expenses-modal").classList.remove("is-active");
});