import app from './app';
import http from 'http';
import express from 'express';
import resizingImage from './resizeImg';
import { Request, Response } from 'express';

const PORT = process.env.PORT || 3000;

// Middleware
app.use('/api/images', resizingImage());
app.use('/api/images', express.static('assets/thumbs', { maxAge: '1d' }));

app.get('/', async (req: Request, res: Response) => {
    res.send('Server started.');
});

// Server instance to use http module to create a server
const server = http.createServer(app);

// function to start the server
function startServer() {
    server.listen(PORT, () => {
        console.log(`Server started @ http://localhost:${PORT}/api/images`);
    });
}

// Instantiate the server
startServer();

export default server;
