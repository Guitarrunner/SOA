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
var paginatedSpaces = function (pageSize, pageNum) {
    var begin = pageSize * (pageNum - 1);
    var end = pageSize * pageNum;
    var pageData = schema.spaces.slice(begin, end);
    return pageData;
};
var paginate = function (data) { return function (pageSize, pageNum) {
    var begin = pageSize * (pageNum - 1);
    var end = pageSize * pageNum;
    var pageData = data.slice(begin, end);
    return { pageData: pageData, hasNext: data.length > end };
}; };
var orderBy = function (data) { return function (orderParam) {
    var result = [];
    var orderList = getOrderList(data, orderParam);
    for (var i = 0; i < orderList.length; i++) {
        var element = orderList[i];
        for (var j = 0; j < data.length; j++) {
            var space = data[j];
            if (space[orderParam] === element) {
                result.push(space);
            }
        }
    }
    return { result: result, paginate: paginate(result) };
}; };
var filterBy = function (data) { return function (filterParam, filterValue) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var space = data[i];
        if (space[filterParam] === filterValue) {
            result.push(space);
        }
    }
    return { result: result, orderBy: orderBy(result), paginate: paginate(result) };
}; };
var getOrderList = function (data, param) {
    var orderList = [];
    for (var i = 0; i < data.length; i++) {
        var element = data[i];
        orderList.push(element[param]);
    }
    return orderList.sort(function (a, b) {
        return a - b;
    });
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
var all = function (data) { return function () {
    return {
        data: data,
        paginate: paginate(data)
    };
}; };
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
            all: all(schema.reservations),
            firstReservation: firstReservation,
            filterBy: filterBy(schema.reservations),
            orderBy: orderBy(schema.reservations)
        },
        commitReservations: commitReservations
    },
    space: {
        get: {
            all: all(schema.spaces),
            orderBy: orderBy(schema.spaces),
            spacesBy: spacesBy,
            firstSpace: firstSpace,
            filterBy: filterBy(schema.spaces)
        },
        setSpaceState: setSpaceState,
        commitSpaces: commitSpaces
    }
};
exports.default = db;
