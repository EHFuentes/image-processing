# Image Resizing API
This project is an image-resizing API built with Express, Sharp, and TypeScript. It provides a simple way to 
resize images on the fly.

## Running the Server
To start the server run npm start from the root directory. Once the server is running you can access 
front end and choose a file within the root/images folder. You will get the option to select the
width and height of the image. The resized image will be saved in the images/thumbs folder.

## Usage
The API provides a single endpoint /api/images/ that takes three query parameters:

Filename: The name of the image file to be resized. The file must be in the images directory.

Width (optional): The desired width of the resized image (default: 200px).

Height (optional): The desired height of the resized image (default: 200px).

### How It Works
The application consists of two main components:

The Express server (server.ts) sets up the server, middleware, and routes. 
The /api/images/ route uses the resizingImage middleware to handle resizing and serving images. 
The server also serves resized images from the assets/thumbs directory with a max-age of 1 day.

The resizingImage middleware (processing.ts): It takes a filename, width, and height from the query 
parameters and checks their validity. If the parameters are valid, it tries to find and read the image 
file in the images directory, resizes it using Sharp, and saves the resized image in the images/thumbs directory.

## Error Handling
The middleware returns a 404 status with a "No filename provided" message if the filename is missing. 
If there are any errors during resizing, a 404 status with an "Error resizing image" message is returned.

## Testing
The application is tested using Jasmine and Supertest.
To test an image it needs to be in the test directory. The test will resize the image and save it in the thumb folder.
To run the test, run npm test from the server directory.

If testing with url and not the front end the file extension must be included in the url.

e.g. ```http://localhost:3000/api/images?filename=fjord.jpg&width=200&height=200```

## Dependencies
- @types/cors - ^2.8.13
- cors - ^2.8.5",
- express - ^4.18.2",
- helmet - ^6.1.5
- sharp - ^0.32.0
