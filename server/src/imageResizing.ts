import sharp from 'sharp';

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
        throw new Error(`Error: ${ext} is an unsupported file format`);
    }
}