import express, {Request, Response} from 'express';
import routes from './routes/route';


import path from 'path';

// Instaniate the object applicatio

const app = express();
// Set the port @5000
const port = 5000;
// This is the front page, endpoint page
app.get('/', (req:Request, res:Response ) => {
    res.send('Welcome to Image processing API end Point')
});

//The api endpoint, for the images
app.use('/images', routes);

//Listen to this port for the server
app.listen(port, () => {
    console.log(`Server Started at localhost:${port}`)
});

export default app;
// e.g. http://localhost:3000/image?f=imageName&x=jpeg&w=100&h=100
