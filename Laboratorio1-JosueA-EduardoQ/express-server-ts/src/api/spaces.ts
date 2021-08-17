import express from 'express';
import db from '../lib/dbSim';

const spacesApp = express();

var lastId = db.space.get.allSpaces().length;

// GET
spacesApp.get('/', (_, res) => {
    const spaces = db.space.get.allSpaces();

    res.status(200).send({
        results: spaces
    });
    console.log('Succesfull GET');
});

// GET by ID
spacesApp.get('/:id', (req, res) => {
    const id = req.params.id;
    var spacesData = db.space.get.allSpaces();

    for (var i = 0; i < spacesData.length; i++) {
        if (spacesData[i].id == parseInt(id)) {
            res.send({
                results: spacesData[i]
            });
            console.log('Succesfull GET');
            return;
        }
    }

    res.status(404).send({ message: 'ID not found' });
});

// POST sin cuerpo, id se autogenera y status siempre es free
spacesApp.post('/', (_, res) => {
    var newId = lastId + 1;
    lastId = newId;
    var spacesData = db.space.get.allSpaces();

    var newSpace = { id: newId, state: 'free' };
    spacesData.push(newSpace);
    res.status(200).send({ spacesData });
    db.space.commitSpaces(spacesData);
    console.log('Succesfull POST');
});

// PUT by ID
spacesApp.put('/:id', (req, res) => {
    const { state } = req.body;
    const id = parseInt(req.params.id);
    var spacesData = db.space.get.allSpaces();

    for (var i = 0; i < spacesData.length; i++) {
        if (spacesData[i].id === id) {
            spacesData[i].state = state;
            db.space.commitSpaces(spacesData);
            res.status(200).send({
                message: 'State changed succesfuly',
                data: spacesData[i]
            });
        }
    }
    res.status(404).send({ message: 'ID not found' });
});

// DELETE
spacesApp.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    var spacesData = db.space.get.allSpaces();

    for (var i = 0; i < spacesData.length; i++) {
        if (spacesData[i].id == id) {
            spacesData.splice(i, 1);
            db.space.commitSpaces(spacesData);
            res.send({ results: spacesData });
            console.log('Succesfull DELETE');
            return;
        }
    }

    res.status(404).send({ message: 'ID not found' });
});

export default spacesApp;
