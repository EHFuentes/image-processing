import { Request, Response } from 'express';
import path from 'path';
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

        // Destructuring the file name and extension
        const [name, ext] = file.split('.');
        const width = Number(req.query.width) || Number(200);
        const height = Number(req.query.height) || Number(200);

        // Check if filename is missing
        if (!file) {
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

        // Path to the images folder
        const imgFolder = path.join(__dirname, '../../images');

        // Log file name and extension
        console.log(`Filename: ${name}.${ext}`);

        // Path to the output file
        const outputFile = `${imgFolder}/thumb/${name}-${width}x${height}.${ext}`;

        // Path to the input file
        const inputFile = `${imgFolder}/${file}`;

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
