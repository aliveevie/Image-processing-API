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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const imageFunction_1 = require("../imageFunctions/imageFunction");
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(index_1.default);
describe("test the image", () => {
    it('should check the front page url', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('checks file exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const inputFile = path_1.default.join(__dirname, '../../pictures/secret/imageone.png');
        const fileExists = yield (0, imageFunction_1.filePresence)(inputFile);
        expect(fileExists).toBe(true);
    }));
});
