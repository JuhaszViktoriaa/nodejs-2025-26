import express from "express";
import * as database from "./database.database.js";
const PORT = 3000;
const app = express();
app.listen(PORT, () =>{
    console.log("a szerver a ${PORT} porton fut");
})

app.use(express.json);

app.get("/books", (req, res) =>{
    const books = database.getBooks();
    res.status(200).json(books);
});
app.get("/books/:id", (req, res) =>{
    const id=get.params.id;
    const book=database.getBook(id);
    if(!book){
        res.status(404).json({message:"felhasznalo nem talalhato"})
    }
    res.status(200).json(book);
});

app.post("/books", (req, res) =>{
    const {title, author}=req.body;
    if(!title || !author){
        res.status(400).json("hianyzo adatok");
    }
    const saved=database.saveBook(title, author);
    const book=database.getBook(saved.LastInsertRowid);
    res.status(201).json(book);
});

app.put("/books/:id", (req, res) =>{
    const id =req.params.id;
    const {title, author} = req.body;
    if(!title || !author){
        res.status(400).json("hianyzo adatok");
    }
    database.updateBook(id, title, author);
    const book=database.getBook(id);
    res.status(200).json(book);
});

app.delete("/books/:id", (req, res) =>{
    const id=req.params.id;
    database.deleteBook(id);
    res.status(200).json("sikeres torles");
});