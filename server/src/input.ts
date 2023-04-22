import fs from "fs";
import path from 'path';
import { Request, Response } from 'express';
import { validateInput } from './validation';
import { resizeImage } from './imageResizing';

function resizingImage() {
    // Create a new Map to store the cache
    const imageCache = new Map();

    return async (req: Request, res: Response) => {

        // Create a cache key
        const cacheKey = `${req.query.filename}-${req.query.width}-${req.query.height}`;

        // Check if the cache has the image
        if (imageCache.has(cacheKey)) {
            console.log(`Image served from cache..`);
            // Get image from cache and send to client
            res.sendFile(imageCache.get(cacheKey));
            return;
        }

        // Get the filename, width and height from the request query
        const file = String(req.query.filename);

        // Destructuring the file name and extension - add absolute numbers
        const [name, ext] = file.split('.');
        const width = Math.abs(Number(req.query.width));
        const height = Math.abs(Number(req.query.height));

        // Call validateInput function
        const validationResult = await validateInput(width, height, file, ext);

        if (validationResult) {
            console.error(validationResult);
            res.status(404).send(validationResult);
            return;
        }

        // Path to the images folder
        const imgFolder = path.join(__dirname, '../../images');

        // Log file name and extension
        console.log(`Filename: ${name}.${ext}`);

        // If thumbs folder does not exist, create it
        if (!fs.existsSync(path.join(__dirname, '../../images/thumb'))) {
            fs.mkdirSync(path.join(__dirname, '../../images/thumb'));
        }

        // Path to the output file
        const outputFile = `${imgFolder}/thumb/${name}-${width}x${height}.${ext}`;

        // Path to the input file
        const inputFile = `${imgFolder}/${file}`;

        // Call resizeImage function
        try {
            await resizeImage(inputFile, outputFile, width, height, ext);

            // Log the image details after resizing
            console.log(`Image Resized!\nWidth: ${width}px\nHeight: ${height}px\nFormat: ${ext}`);

            // Add the image to the cache
            await imageCache.set(cacheKey, outputFile);

            // Send the image to the client
            res.sendFile(outputFile);
            console.log('Image added to cache..');
            return;
        } catch (error) {
            console.error('Error resizing image:', error);
            res.status(404).send('Error resizing image');
            return;
        }
    };
}

export default resizingImage;
