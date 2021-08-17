"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var spacesApp = express_1.default();
spacesApp.get("/", function (req, res) {
    res.send("Hello from express and typescript");
});
var port = process.env.PORT || 3000;
exports.default = spacesApp;
