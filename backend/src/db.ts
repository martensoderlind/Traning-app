import Database from "better-sqlite3";

const db = new Database("./database.db");
db.prepare(
  "CREATE TABLE IF NOT EXISTS sessions ( id INTEGER PRIMAR KEY AUTOINCREAMENT, date TEXT, distance NUMBER, duration TEXT)"
);
console.log("db created");
