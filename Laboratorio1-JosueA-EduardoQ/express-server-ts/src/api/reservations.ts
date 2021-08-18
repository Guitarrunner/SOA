import express from 'express';
import db from '../lib/dbSim';

const reservationsApp = express();

var lastId = db.reservation.get.all().data.length;

// GET
reservationsApp.get('/', (req, res) => {
    var reservationData;

    const { filterValue, order, page } = req.query;

    const filter = filterValue
        ? filterValue.toString().split('_')[0]
        : undefined;
    const value = filterValue
        ? filterValue.toString().split('_')[1]
        : undefined;

    if (filter && value) {
        if (order) {
            if (page) {
                reservationData = db.reservation.get
                    .filterBy(filter, value)
                    .orderBy(order)
                    .paginate(10, page);
            } else {
                reservationData = db.reservation.get
                    .filterBy(filter, value)
                    .orderBy(order)
                    .paginate(10, 1);
            }
        } else {
            if (page) {
                reservationData = db.reservation.get
                    .filterBy(filter, value)
                    .paginate(10, page);
            } else {
                reservationData = db.reservation.get
                    .filterBy(filter, value)
                    .paginate(10, 1);
            }
        }
    } else if (order) {
        if (page) {
            reservationData = db.reservation.get
                .orderBy(order)
                .paginate(10, page);
        } else {
            reservationData = db.reservation.get.orderBy(order).paginate(10, 1);
        }
    } else if (page) {
        reservationData = db.reservation.get.all().paginate(10, page);
    } else {
        reservationData = db.reservation.get.all().paginate(10, 1);
    }

    res.status(200).send({
        results: reservationData.pageData,
        hasNext: reservationData.hasNext
    });
    console.log('Succesfull GET');
});

// POST
reservationsApp.post('/', (req, res) => {
    var reservationsData = db.reservation.get.all().data;

    const { licensePlate } = req.body;
    const checkIn = new Date().getTime().toString();

    const spacesData = db.space.get.all().data;

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
    var reservationsData = db.reservation.get.all().data;

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
