import Database from 'better-sqlite3'

const database = new Database("./database/database.sqlite")

database.prepare(`CREATE TABLE IF NOT EXISTS cars(
    id INTEGER PRIMARY KEY AUTOINCREMENT, brand STRING, model STRING)`).run();

export const getAllcars=()=>database.prepare("SELECT * FROM cars").all();

export const getCarbyid=(id) => database.prepare("SELECT * FROM cars WHERE id=?").get(id);

export const Savecar=(brand, model)=>database.prepare("INSERT INTO cars (brand, model) VALUES (?,?)").run(brand, model);

export const updateCar=(id, brand, model)=> database.prepare("UPDATE cars SET brand = ?, model= ? WHERE id= ?").run(brand, model, id);

export const deleteCar=(id)=> database.prepare("DELETE * FROM cars WHERE id=?").run(id);