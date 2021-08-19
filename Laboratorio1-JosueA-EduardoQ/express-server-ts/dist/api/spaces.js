"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dbSim_1 = __importDefault(require("../lib/dbSim"));
var spacesApp = express_1.default();
var lastId = dbSim_1.default.space.get.allSpaces().length;
// GET
/**
 * @swagger
 * /spaces/:
 *   get:
 *     summary: Devuelve la lista de espacios disponibles filtrados
 *     description: Devuelve la lista de espacios del parqueo, en esta se peuden ver los espacios creados o añadidos luego.
*/
spacesApp.get('/', function (req, res) {
    var spaceData = [];
    if (req.query['filter']) {
        if (req.query['page']) {
            spaceData = dbSim_1.default.space.get
                .orderSpaceBy(req.query['filter'])
                .paginate(10, req.query['page']);
        }
        else {
            spaceData = dbSim_1.default.space.get
                .orderSpaceBy(req.query['filter'])
                .paginate(10, 1);
        }
    }
    else if (req.query['page']) {
        spaceData = dbSim_1.default.space.get.paginatedSpaces(10, req.query['page']);
    }
    else {
        spaceData = dbSim_1.default.space.get.paginatedSpaces(10, 1);
    }
    res.status(200).send({
        results: spaceData
    });
    console.log('Succesfull GET');
});
/**
 * @swagger
 * /spaces/all:
 *   get:
 *      summary: Devuelve la lista de todos los espacios disponibles
 *      description: Devuelve la lista de espacios del parqueo, en esta se pueden ver los espacios creados o añadidos luego.
 *      responses:
 *       200:
 *         description: Espacios.
*/
spacesApp.get('/all', function (req, res) {
    res.status(200).send({
        results: dbSim_1.default.space.get.allSpaces()
    });
    console.log('Succesfull GET');
});
// GET by ID
/**
 * @swagger
 * /spaces/{id}:
 *   get:
 *      summary: Devuelve un espacio por id
 *      description: Devuelve un espacio por id si está en la lista, sino devuelve un error
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del espacio
 *      responses:
 *       200:
 *         description: Espacio encontrado.
*/
spacesApp.get('/:id', function (req, res) {
    var id = req.params.id;
    var spacesData = dbSim_1.default.space.get.allSpaces();
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
/**
 * @swagger
 * /spaces/:
 *   post:
 *     summary: Crea un nuevo espacio.
 *     responses:
 *       200:
 *         description: Creado, el campo se creo con un id predefinido y el status siempre será free al crearse.
 *
 *
*/
spacesApp.post('/', function (_, res) {
    var newId = lastId + 1;
    lastId = newId;
    var spacesData = dbSim_1.default.space.get.allSpaces();
    var newSpace = { id: newId, state: 'free' };
    spacesData.push(newSpace);
    res.status(200).send({ spacesData: spacesData });
    dbSim_1.default.space.commitSpaces(spacesData);
    console.log('Succesfull POST');
});
// PUT by ID
/**
 * @swagger
 * /spaces/{id}:
 *   put:
 *     summary: Cambia el estado de un espacio.
 *     responses:
 *       200:
 *         description: Status de espacio cambiado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del espacio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *               state:
 *                 type: string
 *                 description: estado del espacio.
 *                 example: in-use
 * responses:
 *       200:
 *         description: Espacio modificado.
*/
spacesApp.put('/:id', function (req, res) {
    var state = req.body.state;
    var id = parseInt(req.params.id);
    var spacesData = dbSim_1.default.space.get.allSpaces();
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
/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     summary: Elimina un espacio
 *     description: Por medio de un id elimina el espacio de la lista
 * parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del espacio
 * responses:
 *       200:
 *         description: Espacio eliminado.
*/
spacesApp.delete('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var spacesData = dbSim_1.default.space.get.allSpaces();
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
