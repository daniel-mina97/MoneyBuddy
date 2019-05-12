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

    getExpenses(startDate, endDate, callback) {
        startDate = convertDateIfNull(startDate, '0001-01-01');
        endDate = convertDateIfNull(endDate, '9999-12-31');

        this.db.all(`SELECT *
            FROM expenses
            WHERE date BETWEEN ${startDate} AND ${endDate}
            ORDER BY date;`,
            (err, rows) => {
                callback(rows);
            });
    }
}

function formatStringForSql(formString) {
    if (formString === '') {
        return 'null';
    }
    formString = formString.replace(/'/g, "''");
    return `'${formString}'`;
}

function convertDateIfNull(date, newDate) {
    date = formatStringForSql(date);
    if (date === 'null') {
        date = `'${newDate}'`;
    } 
    return date;
}

module.exports = SqlDriver;