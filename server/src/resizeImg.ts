import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function resizingImage() {
  // Create a new Map to store the cache
  const imageCache = new Map();

  // Return a function that takes in a request and response from validateInput()
  return async (req: Request, res: Response, next: NextFunction) => {
    // Create a cache key
    const cacheKey = `${req.query.filename}-${req.query.width}-${req.query.height}`;

    // Check if the cache has the image
    if (imageCache.has(cacheKey)) {
      console.log(`Image served from cache..`);
      // Get image from cache and send to client
      res.sendFile(imageCache.get(cacheKey));
      return;
    }

    console.log('\nResizingImage middleware called');

    // Get the filename, width and height from the request query
    const filename = req.query.filename as string;
    const width = Number(req.query.width) || Number(200);
    const height = Number(req.query.height) || Number(200);

    // Check if filename is missing
    if (!filename) {
      res.status(404).send('No filename provided');
      console.log('No filename provided');
      return;
    }

    // Check if width and height are numbers
    if (!Number(width) || !Number(height)) {
      res.status(404).send('Width and height are not numbers');
      console.log('Width and height are not numbers');
      return;
    }

    // Get the file extension that contains the file name from the assets directory
    const getFilesInDirectory = String(
      fs
        // Reads the files in the assets directory
        .readdirSync(path.join(__dirname, '..', 'assets'))
        // Filter the files to get the file that contains the filename
        .find((file: string) => file.includes(filename))
    );

    // Get the extension of the file from the filename
    const ext = String(getFilesInDirectory.split('.').pop());

    // Log file name and extension
    console.log(`Filename: ${filename}.${ext}`);

    try {

      // Path to the output file
      const outputFile: string = path.join(
        __dirname,
        '..',
        'assets',
        'thumbs',
        `${filename}-${width}-${height}.${ext}`
      );

      // Path to the input file
      const inputFile: string = path.join(
        __dirname,
        '..',
        'assets',
        `${filename}.${ext}`
      );

      // Sharp instance to resize the image
      const sharpInstance: sharp.Sharp = sharp(inputFile).resize(
        width,
        height,
        {
          fit: sharp.fit.cover,
          withoutEnlargement: true,
        }
      );

      // Convert image to correct file format and save to output file
      if (ext === 'jpg') {
        await sharpInstance.jpeg().sharpen().toFile(outputFile);
      } else if (ext === 'jpeg') {
        await sharpInstance.jpeg().sharpen().toFile(outputFile);
      } else if (ext === 'png') {
        await sharpInstance.png().sharpen().toFile(outputFile);
      } else if (ext === 'webp') {
        await sharpInstance.webp().sharpen().toFile(outputFile);
      } else {
        console.error(`Error: ${ext} is an unsupported file format`);
        res.status(404).send(`Error: ${ext} is an unsupported file format`);
        // Return to stop the middleware from running
        return;
      }

      // Log the image width, height and format
      console.log(
        `Image Resized!\nWidth: ${width}px\nHeight: ${height}px\nFormat: .${ext}`
      );

      // Add the image to the cache
      await imageCache.set(cacheKey, outputFile);

      // Send the image to the client
      res.sendFile(outputFile);

      // Log the image has been added to the cache and the middleware has finished
      console.log('Image added to cache..');
      console.log('ResizingImage middleware finished\n');
      // Return to stop the middleware from running
      return;
    } catch (error) {
      console.error('Error resizing image:', error);
      res.status(404).send('Error resizing image');
      return;
    }
    next();
  };
}

export default resizingImage;
