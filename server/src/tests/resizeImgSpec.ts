import path from 'path';
import server from '../server';
import supertest from 'supertest';

// Import superset to make requests to the server
const request = supertest(server);

// Get the file path of the image to be resized - using mock image
const filePath = '../images/fjord.jpg';

// Get the filename from the file path
const fileName = path.basename(filePath);

// Test suite for image resizing
describe('Image Resizing', () => {
    it('should resize the image successfully', async () => {
        // Make a request to the image resizing endpoint
        const response = await request
            .post('/api/images')

            // with .query() method to pass the filename, width and height parameters
            .query({ filename: fileName, width: Number(400), height: Number(400) });

        // Check if the response status code is 200
        expect(response.status).toBe(200);
    });

    // Test to check if an error is returned for a missing file
    it('should return an error for a missing file', async () => {
        const response = await request
            .post('/api/images')
            .query({ filename: '', width: Number(200), height: Number(200) });
        expect(response.status).toBe(404);
        expect(response.text).toBe('No filename provided');
    });

    // Test to check if an error is returned for a missing width
    it('should not return an error if width is missing', async () => {
        const response = await request.post('/api/images').query({ filename: fileName, height: Number(200) });
        expect(response.status).toBe(200);
    });

    // Test to check if an error is returned for a missing height
    it('should not return error if height is missing', async () => {
        const response = await request.post('/api/images').query({ filename: fileName, width: Number(200) });
        expect(response.status).toBe(200);
    });

    // Test to check if an error is returned for a missing width and height
    it('should not return error if width and height are missing', async () => {
        const response = await request.post('/api/images').query({ filename: fileName });
        expect(response.status).toBe(200);
    });

    // Test to check if an error is returned for a missing filename, width and height
    it('should return an error if filename, width and height are missing', async () => {
        const response = await request.post('/api/images').query({ filename: '' });
        expect(response.status).toBe(404);
        expect(response.text).toBe('No filename provided');
    });
});
