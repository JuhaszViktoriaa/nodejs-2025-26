import Database from "better-sqlite3";
const database = new Database("./database/database.sqlite");

database
  .prepare(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)`
  )
  .run();

export const getUsers = () => database.prepare("SELECT * FROM users").all();

export const getUserbyid = () =>
  database.prepare("SELECT * FROM users WHERE id =?").get();

export const saveUser = (email, password) =>
  database
    .prepare("INSERT INTO users (email, password) VALUES (?,?)")
    .run(email, password);

export const updateUser = (id, email, password) =>
  database
    .prepare("UPDATE users SET email =?, password=? WHERE id=?")
    .run(email, password, id);

export const deleteUser = (id) =>
  database.prepare("DELETE FROM users WHERE id=?").run(id);

export const getUserbyemail = (email) =>
  database.prepare("SELECT * FROM users WHERE email").get(email);
