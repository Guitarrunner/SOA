import express from 'express';
import db from '../lib/dbSim';

const reservationsApp = express();

var lastId = db.reservation.get.allReservations().length;

// GET
reservationsApp.get('/', (_, res) => {
    var reservationsData = db.reservation.get.allReservations();

    res.status(200).send({
        results: reservationsData
    });
    console.log('Succesfull GET');
});

// POST
reservationsApp.post('/', (req, res) => {
    var reservationsData = db.reservation.get.allReservations();

    const { licensePlate } = req.body;
    const checkIn = new Date().getTime().toString();

    const spacesData = db.space.get.allSpaces();

    if (spacesData.length === reservationsData.length) {
        res.status(404).send({ message: 'No spaces available' });
    } else {
        const freeSpace = db.space.get.firstSpace('state', 'free');

        var newReservation = {
            license_plate: licensePlate,
            checked_in: checkIn,
            space_id: freeSpace.id,
            id: lastId
        };

        lastId += 1;

        db.space.setSpaceState(freeSpace.id, 'in-use');
        reservationsData.push(newReservation);

        db.reservation.commitReservations(reservationsData);
        res.status(200).send({ newReservation });
        console.log('Succesfull POST');
    }
});

// DELETE by ID
reservationsApp.delete('/:id', (req, res) => {
    var reservationsData = db.reservation.get.allReservations();

    const id = req.params.id;

    for (var i = 0; i < reservationsData.length; i++) {
        if (reservationsData[i].id === parseInt(id)) {
            reservationsData.splice(i, 1);
            db.reservation.commitReservations(reservationsData);
            res.send({ results: reservationsData });
            console.log('Succesfull DELETE');
            return;
        }
    }
    res.status(404).send({ message: 'ID not found' });
});

export default reservationsApp;
