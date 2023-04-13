"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
// import { Request, Response } from 'express';
// Create Express server
var app = (0, express_1.default)();
// Middleware to allow cross-origin requests from localhost:3000
// origin is the URL of the client
app.use((0, cors_1.default)({ origin: 'http://localhost:63342' }));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client')));
// app.get('/', (req: Request, res: Response) => {
//     // sendFile to serve index.html located in client
//   res.sendFile(path.join(__dirname, '..' , 'client', 'index.html'));
// });
exports.default = app;
