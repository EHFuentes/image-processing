import path from 'path';
import sharp from 'sharp';
import server from '../server';
import supertest from 'supertest';
import { resizeImage } from '../imageResizing';

// Import superset to make requests to the server
const request = supertest(server);

// Get the file path of the image to be resized - using mock image
const filePath = '../images/fjord.jpg';

// Get the filename from the file path
const fileName = path.basename(filePath);

// Test suite for image resizing
describe('Image Resizing,', () => {
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
    it('should return an error if width is missing', async () => {
        const response = await request.post('/api/images').query({ filename: fileName, height: Number(200) });
        expect(response.status).toBe(404);
        expect(response.text).toBe('Check the width of the file');
    });

    // Test to check if an error is returned for a missing height
    it('should return error if height is missing', async () => {
        const response = await request.post('/api/images').query({ filename: fileName, width: Number(200) });
        expect(response.status).toBe(404);
        expect(response.text).toBe('Check the height of the file');
    });

    // Test to check if an error is returned for a missing width and height
    it('should return error if width and height are missing', async () => {
        const response = await request.post('/api/images').query({ filename: fileName });
        expect(response.status).toBe(404);
    });

    // Test to check if an error is returned for a missing filename, width and height
    it('should return an error if filename, width and height are missing', async () => {
        const response = await request.post('/api/images').query({ filename: '' });
        expect(response.status).toBe(404);
        expect(response.text).toBe('No filename provided');
    });
});

// Create a test case for the function.
describe('Testing resizeImage function,', () => {
    it('should resize an image to 200px X 200px', async () => {
        // Get the image to be resized
        const inputFile = '../images/fjord.jpg';

        // Output file path for the resized image
        const outputFile = '../images/thumb/fjord-200x200.jpg';

        // Call the resizeImage function to resize the image
        await resizeImage(inputFile, outputFile, 200, 200, 'jpg');

        // Get the metadata of the resized image and check if the width is 200 pixels
        const resizedImage = await sharp(outputFile).metadata();
        expect(resizedImage.width).toBe(200);
        expect(resizedImage.height).toBe(200);
    });
});
