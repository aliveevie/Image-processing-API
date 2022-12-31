import supertest from 'supertest';
import app from '../index';
import { filePresence, fileDirectory, imageSize } from '../imageFunctions/imageFunction';
import path from 'path'

const request = supertest(app)

describe("test the image", ()=> {
    it('should check the front page url', async ()=> {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    

  

      it('checks file exists', async () => {
        const inputFile = path.join(
          __dirname,
          '../../pictures/secret/imageone.png');
        const fileExists = await filePresence(inputFile);
        expect(fileExists).toBe(true);
      });

});



