"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
// Instaniate the object applicatio
const app = (0, express_1.default)();
// Set the port @5000
const port = 5000;
// This is the front page, endpoint page
app.get('/', (req, res) => {
    res.send('Welcome to Image processing API end Point');
});
//The api endpoint, for the images
app.use('/images', route_1.default);
//Listen to this port for the server
app.listen(port, () => {
    console.log(`Server Started at localhost:${port}`);
});
exports.default = app;
// e.g. http://localhost:3000/image?f=imageName&x=jpeg&w=100&h=100
