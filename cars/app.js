import express from "express"
import * as database from "./database/database.js"

const PORT =3000;
const app=express()

app.use(express.json());

app.get("/cars", (req, res) => {
    const cars = database.getAllcars();
    res.status(200).json(cars);
});

app.get("/cars/:id", (req, res) => {
    const car=database.getCarbyid(+req.params.id);
    if(!car){
        return res.status(200).json(car);
    }
});

app.post("/cars", (req, res) => {
    const {brand, model} = req.body;
    if(!brand || !model){
        return res.status(400).json({message: "nincs ilyen adat."})
    }
    try{
        const saved=database.Savecar(brand, model);
        const car=database.getCarbyid(saved.lastInsertRowid);
        res.status(201).json(car);
    } catch(error){
        res.status(400).json({message: error.message});
    }

});

app.put("/cars/:id", (req, res) => {
    const id =+req.params.id;
    let car=database.getCarbyid(+req.params.id);
    if(!car){
        return res.status(200).json(car);
    }
    res.status(400).json(car);

    const {brand, model} = req.body;
    if(!brand || !model){
        return res.status(400).json({message: "nincs ilyen adat."})
    }
    try{
        database.Updatecar(brand, model);
        car=database.getCarbyid(id);
        res.status(200).json(car);
    } catch(error){
        res.status(400).json({message: error.message});
    }
})

app.delete("/cars/:id", (req, res) => {
    database.deleteCar(+req.params.id);
    res.status(200).json({message: "sikeres torles."})
});


app.listen(PORT, () => {
    console.log(`a szerver a ${PORT} porton fut.`)
})