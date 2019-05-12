const {remote} = require('electron');
const SqlDriver = require('./sqlDriver');
const sqlDriver = new SqlDriver(remote.app.getPath('userData'));

console.log(sqlDriver);

document.querySelector("h1").addEventListener("click", () => {
    console.log("h1 got clicked.");
});

document.querySelector("#submit-expense").addEventListener("submit", (event) => {
    event.preventDefault();
    let date = event.target[0].value;
    let amount = event.target[1].value;
    let location = event.target[2].value;
    let description = event.target[3].value;
    sqlDriver.enterExpense(date, amount, location, description);
});

document.querySelector("#get-expenses").addEventListener("submit", (event) => {
    event.preventDefault();
    let startDate = event.target[0].value;
    let endDate = event.target[1].value;
    sqlDriver.getExpenses(startDate, endDate, (rows)=> {
        console.log(rows);
    });
});
