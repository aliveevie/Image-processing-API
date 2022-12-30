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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSize = exports.fileDirectory = exports.filePresence = void 0;
// Import node file System module
const fs_1 = require("fs");
//The sharp module
const sharp_1 = __importDefault(require("sharp"));
//The function to check the presence of filee
const filePresence = (fileResourceName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFile = yield fs_1.promises.open(fileResourceName, 'r');
        imageFile.close();
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.filePresence = filePresence;
// This function check the file directory presences
const fileDirectory = (directoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.readdir(directoryName);
    }
    catch (_a) {
        yield fs_1.promises.mkdir(directoryName);
    }
    return Promise.resolve();
});
exports.fileDirectory = fileDirectory;
// This function resize the image to the specified directory
const imageSize = (imageName, width, height, outImage) => __awaiter(void 0, void 0, void 0, function* () {
    const outImagePresence = yield filePresence(outImage);
    if (!outImagePresence) {
        console.log('The output file will be ready for view in few moments!');
        yield (0, sharp_1.default)(imageName).resize(width, height).toFile(outImage);
        return outImage;
    }
    else {
        console.log('The image already exixt');
        return outImage;
    }
});
exports.imageSize = imageSize;
