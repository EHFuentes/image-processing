// First, we're importing the 'app' from our server file so we can use it for testing.
import server from '../server';

// Next, we need to import 'supertest' so we can send test HTTP requests to our server.
import supertest from 'supertest';

// Now, we'll create a 'request' variable. We'll use this to send test requests to our 'app'.
const request = supertest(server);

// We're creating a group of tests (a test suite) to check if our server is starting properly.
describe('Is the Server starting..', () => {
  // This is an individual test. It checks if the server is running when we send a request.
  it('should be running', async () => {
    // Sending a GET request to the root endpoint of our server and saving the response.
    const response = await request.get('/');

    // Check if the response status is 200 (OK)
    expect(response.status).toEqual(200);

    console.log(response.text);
  });
});
