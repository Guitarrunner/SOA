import { spacesDB } from "./structure/DB.js"; 
import express from "express";
import cors from "cors";
const app = express();


const PORT = 8080;

app.use(express.json())
app.use(cors())

app.listen(
    PORT,
    () => console.log("Welcome")
)

app.get('/estacionamiento', (req,res) => {
    res.status(200).send("Succesful")
});

app.post('/estacionamiento/:id', (req,res) => {
    const {id} = req.params;
    const {camp} = req.body;

    if (!camp){
        res.status(418).send({message: "uncalled"})
    }
    res.send({id: 'succesful '+camp})
});

app.get('/spaces', (req,res) => {

      res.send({
         results: spacesDB
      });
   
});

app.get('/spaces/:id', (req,res) => {
    const id = req.params.id
    var index = 0
    var findIt = false
    for (var i = 0; i < spacesDB.length; i++){
        if (spacesDB[i].id == id){
            index = i;
            findIt = true;

        }
      }

    
    if (findIt){
        const filteredData = spacesDB[index];
        res.send({
            results: filteredData
         });
    }
    else{
        res.status(418).send({message: "uncalled"})

    }
    
});

app.post('/spaces/', (req,res) => {
    const { state } = req.body;
    var newID =spacesDB.length+1;               //Revisar, puede generar id's repetidos
    var newSpace = {id: newID, state: state};
    spacesDB.push(newSpace);
    res.send({spacesDB,message: "Succesful"})

});

app.put('/spaces/:id', (req,res) => {
    const { state } = req.body;
    const id = req.params.id
    var index = 0
    var findIt = false
    for (var i = 0; i < spacesDB.length; i++){
        if (spacesDB[i].id == id){
            index = i;
            findIt = true;

        }
      }

    
    if (findIt){
        spacesDB[index].state = state
        res.send({results: spacesDB, message: "Succesful"})
      
        
    }
    else{
        res.status(418).send({message: "uncalled"})

    }
});

app.delete('/spaces/:id', (req,res) => {
    const id = req.params.id
    var index = 0
    var findIt = false
    for (var i = 0; i < spacesDB.length; i++){
        if (spacesDB[i].id == id){
            index = i;
            findIt = true;

        }
      }

    
    if (findIt){
        const firstArr = spacesDB.slice(0, index);
        const secondArr = spacesDB.slice(index + 1);   
        var spacesDBe = [...firstArr , ...secondArr];     // hay que guardarlo bien porque spacesDB es const
        res.send({results: spacesDBe, message: "Succesful"})
      
        
    }
    else{
        res.status(418).send({message: "uncalled"})

    }

});

app.get('/reservations', (req,res) => {

});

app.post('/reservations', (req,res) => {

});

app.delete('/reservations/:id', (req,res) => {

});
