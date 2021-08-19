"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var spaces_1 = __importDefault(require("./api/spaces"));
var reservations_1 = __importDefault(require("./api/reservations"));
var https = require('https');
var path = require('path');
var fs = require('fs');
var mainApp = express_1.default();
var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Parqueo TEC',
            version: '1.2',
        },
    },
    servers: [
        {
            url: 'https://localhost:30007',
            description: 'Parqueo TEC',
        },
    ],
    apis: ['./dist/api/*.js']
};
var options2 = {
    explorer: true
};
var swaggerSpec = swaggerJsdoc(options);
var port = process.env.PORT || 3000;
mainApp.get('/', function (req, res) {
    res.send('Hello from express and typescript');
});
mainApp.use(express_1.default.json({
    verify: function (_, res, buf, __) {
        try {
            JSON.parse(buf.toString());
        }
        catch (e) {
            res.status(405).send('ko');
            throw Error('invalid JSON');
        }
    }
}));
mainApp.use(cors_1.default());
mainApp.use('/spaces', spaces_1.default);
mainApp.use('/reservations', reservations_1.default);
mainApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options2));
var sslApp = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, mainApp);
sslApp.listen(port, function () { return console.log("App listening on PORT " + port); });
