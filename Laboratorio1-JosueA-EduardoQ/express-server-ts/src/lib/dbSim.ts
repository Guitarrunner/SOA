import data from './db.json';

const spacesBy = (param, value) => {
    var result = [];
    for (let i = 0; i < schema.spaces.length; i++) {
        const space = schema.spaces[i];
        if (space[param] === value) {
            result.push(space);
        }
    }
    return result;
};

const setSpaceState = (id, state) => {
    for (let i = 0; i < schema.spaces.length; i++) {
        const element = schema.spaces[i];
        if (element.id === id) {
            schema.spaces[i].state = state;
        }
    }
};

const firstSpace = (param = undefined, value = undefined) => {
    if (param === undefined || value === undefined) {
        return schema.spaces[0];
    }
    for (let i = 0; i < schema.spaces.length; i++) {
        const space = schema.spaces[i];
        if (space[param] === value) {
            return space;
        }
    }
};

const firstReservation = (param = undefined, value = undefined) => {
    if (param === undefined || value === undefined) {
        return schema.spaces[0];
    }
    for (let i = 0; i < schema.reservations.length; i++) {
        const space = schema.reservations[i];
        if (space[param] === value) {
            return space;
        }
    }
};

const allSpaces = () => {
    return schema.spaces;
};

const allReservations = () => {
    return schema.reservations;
};

const commitSpaces = (spaces) => {
    schema.spaces = spaces;
};

const commitReservations = (reservations) => {
    schema.reservations = reservations;
};

var schema = {
    spaces: data.spaces,
    reservations: data.reservations
};

const db = {
    reservation: {
        get: {
            allReservations,
            firstReservation
        },
        commitReservations
    },
    space: {
        get: {
            allSpaces,
            spacesBy,
            firstSpace
        },
        setSpaceState,
        commitSpaces
    }
};

export default db;
