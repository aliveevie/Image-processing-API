import supertest from 'supertest';
import app from '../index';
const request = supertest(app)

describe("test the image", ()=> {
    it('should check the front page url', async ()=> {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
     // check for missing query parameters
     it('checks for missing query parameters', async () => {
        const response: string | any = request.get('/images');
        expect(response.status).toBe(400);
      });
});

