import Database from "better-sqlite3";

const db = new Database("./database.db");
db.prepare(
  "CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, distance NUMBER, duration TEXT)"
).run();
console.log("db created");

export function addSession(date: string, distance: number, duration: string) {
  const newInput = db.prepare(
    "INSERT INTO sessions (date, distance, duration) VALUES (?,?,?)"
  );
  newInput.run(date, distance, duration);
  console.log("session added!");
}

addSession("2024-10-13", 11, "59:44");
