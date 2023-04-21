export async function validateInput(width: number, height: number, file: string, ext: string) {
    if (file === '' || file === null || file === undefined) {
        return 'No filename provided';
    }

    if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'webp') {
        return 'File extension must be jpg, jpeg, png or webp';
    }

    if (width === 0 || width === undefined || width === null || !Number(width)) {
        console.log('Check the width of the file');
        return 'Check the width of the file';
    }

    if (height === 0 || height === undefined || height === null || !Number(height)) {
        return 'Check the height of the file';
    }
}
