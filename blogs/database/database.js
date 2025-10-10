import database from "better-sqlite3";

const db = new database('./database/database.sqlite');

export default db;