import Database from "better-sqlite3";

const database = new Database("./database/database.sqlite");

database.prepare(`CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), author STRING)`).run();
export const getBooks =() => database.prepare(`SELECT * FROM books`).all();
export const getBook =()=> database.prepare(`SELECT * FROM books WHERE id=?`).get(id);
export const saveBook=(title, author)=> database.prepare(`INSERT INTO books (title, author) VALUES (?,?)`).run(title, author);
export const updateBook=(title, author)=> database.prepare(`UPDATE books SET title =?, author=? WHERE id=?`).run(title, author,id);
export const deleteBook=(id)=> database.prepare(`DELETE * FROM books WHERE id=?`).run(id);
const books = getBooks();
if(books.length ==0){
    saveBook("Harry Potter", "JK Rowling")
    saveBook("1984", "George Orwell")
    saveBook("Alice in wonderland", "Lewis Carol")
}