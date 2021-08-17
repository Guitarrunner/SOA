"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dbSim_1 = __importDefault(require("../lib/dbSim"));
var reservationsApp = express_1.default();
var lastId = dbSim_1.default.reservation.get.allReservations().length;
// GET
reservationsApp.get('/', function (_, res) {
    var reservationsData = dbSim_1.default.reservation.get.allReservations();
    res.status(200).send({
        results: reservationsData
    });
    console.log('Succesfull GET');
});
// POST
reservationsApp.post('/', function (req, res) {
    var reservationsData = dbSim_1.default.reservation.get.allReservations();
    var licensePlate = req.body.licensePlate;
    var checkIn = new Date().getTime().toString();
    var spacesData = dbSim_1.default.space.get.allSpaces();
    if (spacesData.length === reservationsData.length) {
        res.status(404).send({ message: 'No spaces available' });
    }
    else {
        var freeSpace = dbSim_1.default.space.get.firstSpace('state', 'free');
        var newReservation = {
            license_plate: licensePlate,
            checked_in: checkIn,
            space_id: freeSpace.id,
            id: lastId
        };
        lastId += 1;
        dbSim_1.default.space.setSpaceState(freeSpace.id, 'in-use');
        reservationsData.push(newReservation);
        dbSim_1.default.reservation.commitReservations(reservationsData);
        res.status(200).send({ newReservation: newReservation });
        console.log('Succesfull POST');
    }
});
// DELETE by ID
reservationsApp.delete('/:id', function (req, res) {
    var reservationsData = dbSim_1.default.reservation.get.allReservations();
    var id = req.params.id;
    for (var i = 0; i < reservationsData.length; i++) {
        if (reservationsData[i].id === parseInt(id)) {
            reservationsData.splice(i, 1);
            dbSim_1.default.reservation.commitReservations(reservationsData);
            res.send({ results: reservationsData });
            console.log('Succesfull DELETE');
            return;
        }
    }
    res.status(404).send({ message: 'ID not found' });
});
exports.default = reservationsApp;
