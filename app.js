import express from 'express'
const PORT = 3000
const app = express()

app.listen(PORT, () =>{
    console.log('a szerver a ${PORT}. porton fut.')
})

app.use(express.json());

const users =[
    {id: 1, nev: 'alice', kor: 20},
    {id: 2, nev: 'beth', kor: 21},
    {id: 3, nev: 'cedric', kor: 19}
]

app.get("/users", (req, res) => {
    res.status(200).json(users);
})

app.get("/users/:id", (req, res) => {
    const uid=parseInt(req.params.id);
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "felhasznalo nem talalhato."});
    }
    res.status(200).json(user);
});

app.post("/users", (req, res) => {
    const {nev, kor} = req.body;
    if(!nev || !kor){
        return res.status(404).json({message: "ervenytelen adatok."});
    }
    const id=users[users.length-1]?.id + 1;
    const user= {id, nev, kor};
    users.push(user);
    res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
    const uid=Number(req.params.id);
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "felhasznalo nem talalhato."});
    }
    const {nev, kor} = req.body;
    if(!nev || !kor){
        return res.status(404).json({message: "ervenytelen adatok."});
    }
    const index = users.indexOf(user);
    users[index]={
        id: user.id,
        nev: nev,
        kor: kor
    };
    res.status(200).json(users[index]);
});

app.delete("/users/:id", (req, res) => {
    const uid=+req.params.id;
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "felhasznalo nem talalhato."});
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({message: "sikeres torles."});
});

app.patch("/users/:id", (req, res) => {
    const uid=+req.params.id;
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "felhasznalo nem talalhato."});
    }
    const {nev, kor} = req.body;
    const index = users.indexOf(user);
    users[index]={
        id: user.id,
        nev: nev || user.nev,
        kor: kor || user.kor,
    };
    res.status(200).json(users[index]);
});
