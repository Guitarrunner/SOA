"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_json_1 = __importDefault(require("./db.json"));
var spacesBy = function (param, value) {
    var result = [];
    for (var i = 0; i < schema.spaces.length; i++) {
        var space = schema.spaces[i];
        if (space[param] === value) {
            result.push(space);
        }
    }
    return result;
};
var setSpaceState = function (id, state) {
    for (var i = 0; i < schema.spaces.length; i++) {
        var element = schema.spaces[i];
        if (element.id === id) {
            schema.spaces[i].state = state;
        }
    }
};
var firstSpace = function (param, value) {
    if (param === void 0) { param = undefined; }
    if (value === void 0) { value = undefined; }
    if (param === undefined || value === undefined) {
        return schema.spaces[0];
    }
    for (var i = 0; i < schema.spaces.length; i++) {
        var space = schema.spaces[i];
        if (space[param] === value) {
            return space;
        }
    }
};
var firstReservation = function (param, value) {
    if (param === void 0) { param = undefined; }
    if (value === void 0) { value = undefined; }
    if (param === undefined || value === undefined) {
        return schema.spaces[0];
    }
    for (var i = 0; i < schema.reservations.length; i++) {
        var space = schema.reservations[i];
        if (space[param] === value) {
            return space;
        }
    }
};
var allSpaces = function () {
    return schema.spaces;
};
var allReservations = function () {
    return schema.reservations;
};
var commitSpaces = function (spaces) {
    schema.spaces = spaces;
};
var commitReservations = function (reservations) {
    schema.reservations = reservations;
};
var schema = {
    spaces: db_json_1.default.spaces,
    reservations: db_json_1.default.reservations
};
var db = {
    reservation: {
        get: {
            allReservations: allReservations,
            firstReservation: firstReservation
        },
        commitReservations: commitReservations
    },
    space: {
        get: {
            allSpaces: allSpaces,
            spacesBy: spacesBy,
            firstSpace: firstSpace
        },
        setSpaceState: setSpaceState,
        commitSpaces: commitSpaces
    }
};
exports.default = db;
