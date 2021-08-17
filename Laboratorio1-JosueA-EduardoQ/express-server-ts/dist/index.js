"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var spaces_1 = __importDefault(require("./api/spaces"));
var reservations_1 = __importDefault(require("./api/reservations"));
var mainApp = express_1.default();
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
mainApp.listen(port, function () { return console.log("App listening on PORT " + port); });
