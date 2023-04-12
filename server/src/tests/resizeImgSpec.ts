import app from '../server';
import supertest from 'supertest';

// Import supertest library for testing express endpoints
const request = supertest(app);

// Describe the test suite for the image resizing function
describe('Image Resizing', () => {
  // Test to check if image resizing was successful
  it('should resize the image successfully', async () => {
    // Make a request to the image resizing endpoint with valid query parameters
    const response = await request.get('/api/images/').query({
      filename: 'fjord',
      width: 200,
      height: 200,
    });
    // Check if the response status code is 200
    expect(response.status).toBe(200);
  });

  // Test to check if an error is returned for a missing file
  it('should return an error for a missing file', async () => {
    // Make a request to the image resizing endpoint with an empty filename parameter
    const response = await request.get('/api/images/').query({
      filename: null,
    });
    // Check if the response status code is 404
    expect(response.status).toBe(404);
    // Check if the response text is 'No filename provided'
    expect(response.text).toBe('No filename provided');
  });

  // Test to check if an error is returned for a missing width
  it('should not return an error if width is missing', async () => {
    // Make a request to the image resizing endpoint with an empty width parameter
    const response = await request.get('/api/images/').query({
      filename: 'fjord',
      width: null,
      height: 200,
    });
    // Check if the response status code is 200
    expect(response.status).toBe(200);
  });

  // Test to check if an error is returned for a missing height
  it('should not return error if height is missing', async () => {
    // Make a request to the image resizing endpoint with an empty height parameter
    const response = await request.get('/api/images/').query({
      filename: 'fjord',
      height: null,
      width: 200,
    });
    // Check if the response status code is 200
    expect(response.status).toBe(200);
  });

  // Test to check if an error is returned for a missing width and height
  it('should not return error if width and height are missing', async () => {
    // Make a request to the image resizing endpoint with an empty width and height parameter
    const response = await request.get('/api/images/').query({
      filename: 'fjord',
      width: null,
      height: null,
    });
    // Check if the response status code is 200
    expect(response.status).toBe(200);
  });

  // test to check if an error is returned for a missing filename, width and height
  it('should return an error if filename, width and height are missing', async () => {
    // Make a request to the image resizing endpoint with an empty filename, width and height parameter
    const response = await request.get('/api/images/').query({
      filename: null,
      width: null,
      height: null,
    });
    // Check if the response status code is 404
    expect(response.status).toBe(404);
    // Check if the response text is 'No filename provided'
    expect(response.text).toBe('No filename provided');
  });
});
