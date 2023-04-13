"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
// Create Express server
var app = (0, express_1.default)();
// Middleware to allow cross-origin requests
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client')));
exports.default = app;
