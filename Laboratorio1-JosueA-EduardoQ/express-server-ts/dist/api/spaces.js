"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dbSim_1 = __importDefault(require("../lib/dbSim"));
var spacesApp = express_1.default();
var lastId = dbSim_1.default.space.get.all().data.length;
// GET
spacesApp.get('/', function (req, res) {
    var spaceData;
    var _a = req.query, filterValue = _a.filterValue, order = _a.order, page = _a.page;
    var filter = filterValue
        ? filterValue.toString().split('-')[0]
        : undefined;
    var value = filterValue
        ? filterValue.toString().split('-')[1]
        : undefined;
    if (filter && value) {
        if (order) {
            if (page) {
                spaceData = dbSim_1.default.space.get
                    .filterBy(filter, value)
                    .orderBy(order)
                    .paginate(10, page);
            }
            else {
                spaceData = dbSim_1.default.space.get
                    .filterBy(filter, value)
                    .orderBy(order)
                    .paginate(10, 1);
            }
        }
        else {
            if (page) {
                spaceData = dbSim_1.default.space.get
                    .filterBy(filter, value)
                    .paginate(10, page);
            }
            else {
                spaceData = dbSim_1.default.space.get
                    .filterBy(filter, value)
                    .paginate(10, 1);
            }
        }
    }
    else if (order) {
        if (page) {
            spaceData = dbSim_1.default.space.get.orderBy(order).paginate(10, page);
        }
        else {
            spaceData = dbSim_1.default.space.get.orderBy(order).paginate(10, 1);
        }
    }
    else if (page) {
        spaceData = dbSim_1.default.space.get.all().paginate(10, page);
    }
    else {
        spaceData = dbSim_1.default.space.get.all().paginate(10, 1);
    }
    res.status(200).send({
        results: spaceData.pageData,
        hasNext: spaceData.hasNext
    });
    console.log('Succesfull GET');
});
spacesApp.get('/all', function (_, res) {
    res.status(200).send({
        results: dbSim_1.default.space.get.all().data
    });
    console.log('Succesfull GET');
});
// GET by ID
spacesApp.get('/:id', function (req, res) {
    var id = req.params.id;
    var spacesData = dbSim_1.default.space.get.all().data;
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
spacesApp.post('/', function (_, res) {
    var newId = lastId + 1;
    lastId = newId;
    var spacesData = dbSim_1.default.space.get.all().data;
    var newSpace = { id: newId, state: 'free' };
    spacesData.push(newSpace);
    res.status(200).send({ spacesData: spacesData });
    dbSim_1.default.space.commitSpaces(spacesData);
    console.log('Succesfull POST');
});
// PUT by ID
spacesApp.put('/:id', function (req, res) {
    var state = req.body.state;
    var id = parseInt(req.params.id);
    var spacesData = dbSim_1.default.space.get.all().data;
    for (var i = 0; i < spacesData.length; i++) {
        if (spacesData[i].id === id) {
            spacesData[i].state = state;
            dbSim_1.default.space.commitSpaces(spacesData);
            res.status(200).send({
                message: 'State changed succesfuly',
                data: spacesData[i]
            });
        }
    }
    res.status(404).send({ message: 'ID not found' });
});
// DELETE
spacesApp.delete('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var spacesData = dbSim_1.default.space.get.all().data;
    for (var i = 0; i < spacesData.length; i++) {
        if (spacesData[i].id == id) {
            spacesData.splice(i, 1);
            dbSim_1.default.space.commitSpaces(spacesData);
            res.send({ results: spacesData });
            console.log('Succesfull DELETE');
            return;
        }
    }
    res.status(404).send({ message: 'ID not found' });
});
exports.default = spacesApp;
