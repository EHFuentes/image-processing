import sharp from 'sharp';
import { Sharp } from 'sharp';

export async function resizeImage(
    inputFile: string,
    outputFile: string,
    width: number,
    height: number,
    ext: string,
): Promise<void> {
    // Sharp instance to resize the image
    const sharpInstance: sharp.Sharp = sharp(inputFile).resize(width, height, {
        fit: sharp.fit.cover,
        withoutEnlargement: true,
    });

    // Object containing the file formats
    const fileFormats: Record<string, Sharp> = {
        jpg: sharpInstance.jpeg().sharpen(),
        jpeg: sharpInstance.jpeg().sharpen(),
        png: sharpInstance.png().sharpen(),
        webp: sharpInstance.webp().sharpen(),
    };

    // Check if the file format is supported
    const format = fileFormats[ext];

    // If the file format is supported, resize the image
    if (format) {
        await format.toFile(outputFile);
    } else {
        throw new Error(`Error: ${ext} is an unsupported file format`);
    }
}