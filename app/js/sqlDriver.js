const sqlite3 = require('sqlite3');

class SqlDriver {
    constructor(userDataPath) {
        this.db = new sqlite3.Database(userDataPath + '/data.db');

        this.db.run(`CREATE TABLE IF NOT EXISTS expenses(
            date TEXT NOT NULL,
            amount REAL NOT NULL,
            location TEXT,
            description TEXT);`)
    }

    enterExpense(date, amount, location, description) {
        date = formatStringForSql(date); // Will never be 'null' as it is required in html form.
        location = formatStringForSql(location);
        description = formatStringForSql(description);

        this.db.run(`INSERT INTO expenses(date, amount, location, description)
            VALUES(${date}, ${amount}, ${location}, ${description});`,
            (e) => {
                console.log(e);
            });
    }

SqlDriver.prototype.getExpenses = function() {
    this.db.all(`SELECT *
        FROM expenses;`,
        (err, rows) => {
            return rows;
        });
}

function getSqlString(formString) {
    if (formString === '') {
        return 'null';
    }
    return `'${formString}'`;
}

module.exports = SqlDriver;