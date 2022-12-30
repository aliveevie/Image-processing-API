"use strict";
//this is the main API route
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express server module
const express_1 = __importDefault(require("express"));
// Path module
const path_1 = __importDefault(require("path"));
// Image file utilities module
const imageFunction_1 = require("../imageFunctions/imageFunction");
// create the Router object
const routes = express_1.default.Router();
// define the image resize route
// e.g. http://localhost:3000/image?f=imageName&x=jpeg&w=100&h=100
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.f;
    const extension = req.query.x;
    const width = req.query.w;
    const height = req.query.h;
    // check for valid request query parameters
    // if any one of these are not provided, image processor cannot proceed
    if (filename === undefined ||
        extension === undefined ||
        width === undefined ||
        height === undefined) {
        // invalid request query parameters
        res.status(400).send('Missing request query parameters');
    }
    else {
        // check for valid width and height values
        const w = parseInt(width);
        const h = parseInt(height);
        if (isNaN(w) || isNaN(h)) {
            res.status(400).send('Invalid request query parameters');
        }
        else {
            // pass the file extension as a request query parameter
            const extensionLowercase = extension.toLowerCase();
            const assetResourceName = path_1.default.join(__dirname, '../../pictures/secret/') +
                filename +
                '.' +
                extensionLowercase;
            const thumbnailDirectory = path_1.default.join(__dirname, '../../pictures/thumbnail/');
            const thumbnailResourceName = thumbnailDirectory +
                filename +
                '-' +
                width +
                'w-' +
                height +
                'h.' +
                extensionLowercase;
            // check if specified file exists in assets
            const assetExists = yield (0, imageFunction_1.filePresence)(assetResourceName);
            if (assetExists) {
                // check if thumbnail directory exists; create if it doesn't
                (0, imageFunction_1.fileDirectory)(thumbnailDirectory);
                // resize asset image to specified dimensions and save as thumbnail
                (0, imageFunction_1.imageSize)(assetResourceName, parseInt(width), parseInt(height), thumbnailResourceName).then((outImage) => {
                    console.log('file returned: ' + outImage);
                    res.status(200).sendFile(outImage);
                });
            }
            else {
                // unknown filename resource
                res.status(404).send('Cannot find the requested resource');
            }
        }
    }
}));
// export the routes object
exports.default = routes;
