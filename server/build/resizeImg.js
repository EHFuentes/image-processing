"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
function resizingImage() {
    var _this = this;
    // Create a new Map to store the cache
    var imageCache = new Map();
    // Return a function that takes in a request and response from validateInput()
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var cacheKey, file, _a, name, ext, width, height, imgFolder, outputFile, inputFile, sharpInstance, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cacheKey = "".concat(req.query.filename, "-").concat(req.query.width, "-").concat(req.query.height);
                    // Check if the cache has the image
                    if (imageCache.has(cacheKey)) {
                        console.log("Image served from cache..");
                        // Get image from cache and send to client
                        res.sendFile(imageCache.get(cacheKey));
                        return [2 /*return*/];
                    }
                    console.log('\nResizingImage middleware called');
                    file = String(req.query.filename);
                    _a = file.split('.'), name = _a[0], ext = _a[1];
                    console.log("Name: ".concat(name));
                    console.log("Extension: ".concat(ext));
                    width = Number(req.query.width) || Number(200);
                    height = Number(req.query.height) || Number(200);
                    // Check if filename is missing
                    if (!file) {
                        res.status(404).send('No filename provided');
                        console.log('No filename provided');
                        return [2 /*return*/];
                    }
                    // Check if width and height are numbers
                    if (!Number(width) || !Number(height)) {
                        res.status(404).send('Width and height are not numbers');
                        console.log('Width and height are not numbers');
                        return [2 /*return*/];
                    }
                    imgFolder = path_1.default.join(__dirname, '../../images');
                    // Log file name and extension
                    console.log("Filename: ".concat(name, ".").concat(ext));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 12, , 13]);
                    outputFile = ("".concat(imgFolder, "/thumb/").concat(name, "-").concat(width, "x").concat(height, ".").concat(ext));
                    inputFile = "".concat(imgFolder, "/").concat(file);
                    sharpInstance = (0, sharp_1.default)(inputFile).resize(width, height, {
                        fit: sharp_1.default.fit.cover,
                        withoutEnlargement: true,
                    });
                    if (!(ext === 'jpg')) return [3 /*break*/, 3];
                    return [4 /*yield*/, sharpInstance.jpeg().sharpen().toFile(outputFile)];
                case 2:
                    _b.sent();
                    console.log(outputFile, 'from extension check ');
                    return [3 /*break*/, 10];
                case 3:
                    if (!(ext === 'jpeg')) return [3 /*break*/, 5];
                    return [4 /*yield*/, sharpInstance.jpeg().sharpen().toFile(outputFile)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 5:
                    if (!(ext === 'png')) return [3 /*break*/, 7];
                    return [4 /*yield*/, sharpInstance.png().sharpen().toFile(outputFile)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 7:
                    if (!(ext === 'webp')) return [3 /*break*/, 9];
                    return [4 /*yield*/, sharpInstance.webp().sharpen().toFile(outputFile)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    console.error("Error: ".concat(ext, " is an unsupported file format"));
                    res.status(404).send("Error: ".concat(ext, " is an unsupported file format"));
                    // Return to stop the middleware from running
                    return [2 /*return*/];
                case 10:
                    // Log the image width, height and format
                    console.log("Image Resized!\nWidth: ".concat(width, "px\nHeight: ").concat(height, "px\nFormat: ").concat(ext));
                    // Add the image to the cache
                    return [4 /*yield*/, imageCache.set(cacheKey, outputFile)];
                case 11:
                    // Add the image to the cache
                    _b.sent();
                    // Send the image to the client
                    res.sendFile(outputFile);
                    // Log the image has been added to the cache and the middleware has finished
                    console.log('Image added to cache..');
                    // Return to stop the middleware from running
                    return [2 /*return*/];
                case 12:
                    error_1 = _b.sent();
                    console.error('Error resizing image:', error_1);
                    res.status(404).send('Error resizing image');
                    return [2 /*return*/];
                case 13:
                    next();
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.default = resizingImage;
