import app from './app';
import http from 'http';
import multer from 'multer';
import express from 'express';
import resizingImage from './resizeImg';
import { Request, Response } from 'express';

// const PORT = Number(process.env.PORT) || 3000;

const PORT = Number(3000);

// ------------------ Multer ------------------ //

// multer middleware to upload images
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../server/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: fileStorage });

// ------------------ Express ------------------ //

// Middleware
app.use('/api/images', resizingImage());
app.use('/api/images', express.static('assets/thumbs', { maxAge: '1d' }));
app.get('/api/images', async (req: Request, res: Response) => {
    await res.send('Server started.');
});

app.post('api/images', upload.single('filename'), async (req: Request, res: Response) => {
    await res.send('Image uploaded..');
});

// Server instance to use http module to create a server
const server = http.createServer(app);

// function to start the server
async function startServer() {
    server.listen(PORT, () => {
        console.log(`Server started @ http://localhost:${PORT}/api/images`);
    });
}

// Instantiate the server
startServer();

// Export for testing
