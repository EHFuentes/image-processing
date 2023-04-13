import server from '../server';
import supertest from 'supertest';
import { describe } from 'node:test';

// Create a request variable to use in our tests.
const request = supertest(server);

// Test suite for the server.
describe('Server', () => {
    // Testing if the server is starting properly.
    it('should start', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Server started.');
    });
});
