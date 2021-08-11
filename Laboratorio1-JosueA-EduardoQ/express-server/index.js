import { spacesDB } from "./structure/DB.js";
import { reservationsDB } from "./structure/DB.js";
import express from "express";
import cors from "cors";

//Constantes de inicialización de servidor
const app = express();
const PORT = 3005;

//Habilitar formato JSON y CORS al server
app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.status(405).send('ko');
            throw Error('invalid JSON');
        }
    }
}))
app.use(cors())

//Si el servidor funciona, saluda
app.listen(
    PORT,
    () => {
        console.log("//////////////////////");
        console.log("Greetings");
        console.log("Server running on port: ", PORT);
        console.log("//////////////////////");
    }
)


app.get('/', (_, res) => {
    res.json({ message: 'Hello World' })
});

// GET
app.get('/spaces', (req, res) => {
    res.status(200).send({
        results: spacesDB
    });
    console.log("Succesfull GET")

});

// GET by ID
app.get('/spaces/:id', (req, res) => {
    const id = req.params.id
    var index = 0
    var findIt = false

    for (var i = 0; i < spacesDB.length; i++) {
        if (spacesDB[i].id == id) {
            index = i;
            findIt = true;
        }
    }

    if (findIt) {
        const filteredData = spacesDB[index];
        res.send({
            results: filteredData
        });
        console.log("Succesfull GET")
    } else {
        res.status(404).send({ message: "ID not found, try another" })
    }

});

// POST sin cuerpo, id se autogenera y status siempre es free
app.post('/spaces', (_, res) => {
    var state = "free"
    var newID = 1
    var index = 0
    var running = true
        // Otra forma que puede ser más eficiente es tener una variable global que se guarde y cuando  
        // empiece la populación de la base solo suma +1, así nunca se reutilizan pero se desechan
        // IDs sin usa
    while (running) {
        if (index == spacesDB.length) {
            running = false;
        } else {
            if (spacesDB[index].id == newID) {
                newID = newID + 1
                index = 0
            } else {
                index = index + 1
            }
        }
    }

    var newSpace = { id: newID, state: state }
    spacesDB.push(newSpace)
    res.status(200).send({ spacesDB })
    console.log("Succesfull POST")

});

// PUT by ID
app.put('/spaces/:id', (req, res) => {


    const { state } = req.body;
    const id = req.params.id

    var index = 0
    var findIt = false

    for (var i = 0; i < spacesDB.length; i++) {
        if (spacesDB[i].id == id) {
            index = i;
            findIt = true;
        }
    }

    if (findIt) {
        spacesDB[index].state = state
        res.send({ results: spacesDB })
        console.log("Succesfull PUT")
    } else {
        res.status(404).send({ message: "ID not found" })
    }

});


// DELETE
app.delete('/spaces/:id', (req, res) => {
    const id = req.params.id
    var index = 0
    var findIt = false
    for (var i = 0; i < spacesDB.length; i++) {
        if (spacesDB[i].id == id) {
            index = i;
            findIt = true;
        }
    }

    if (findIt) {
        spacesDB.splice(index, 1);
        res.send({ results: spacesDB })
        console.log("Succesfull DELETE")
    } else {
        res.status(404).send({ message: "ID not found" })
    }

});

// GET
app.get('/reservations', (req, res) => {
    res.status(200).send({
        results: reservationsDB
    });
    console.log("Succesfull GET")

});


// POST
app.post('/reservations', (req, res) => {
    const { licensePlate } = req.body;
    const checkIn = new Date().getTime().toString()
    var spaceID = 0;
    var spaceAvailable = false

    for (var i = 0; i < spacesDB.length; i++) {
        if (spacesDB[i].state == "free") {
            spaceID = spacesDB[i].id;
            spacesDB[i].state = "in-use"
            spaceAvailable = true;
            break
        }
    }

    if (spaceAvailable) {
        var newReservation = { licensePlate: licensePlate, checkIn: checkIn, spaceID: spaceID }
        reservationsDB.push(newReservation)
        res.status(200).send({ reservationsDB })
        console.log("Succesfull POST")

    } else {
        res.status(404).send({ message: "No spaces available" })
    }

});

// DELETE by ID
app.delete('/reservations/:id', (req, res) => {
    const id = req.params.id
    var index = 0
    var findIt = false
    for (var i = 0; i < reservationsDB.length; i++) {
        if (reservationsDB[i].spaceID == id) {
            index = i;
            findIt = true;
        }
    }

    if (findIt) {
        var indexID = 0;
        for (var i = 0; i < spacesDB.length; i++) {
            if (spacesDB[i].id == id) {
                indexID = i;
                break
            }
        }
        spacesDB[indexID].state = "free"
        reservationsDB.splice(index, 1);
        res.send({ results: reservationsDB })
        console.log("Succesfull DELETE")
    } else {
        res.status(404).send({ message: "ID not found" })
    }
});