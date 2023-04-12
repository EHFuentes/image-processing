import http from 'http';
import express from 'express';
import resizingImage from './resizeImg';
import { Request, Response } from 'express';

const PORT = Number(3000);
const app = express();

// Middleware
app.use('/api/images/', resizingImage());
app.use('/api/images/', express.static('assets/thumbs', { maxAge: '1d' }));

// Endpoint to check if server is running
app.get('/', async (req: Request, res: Response) => {
  await res.send('Server started.');
});

// Server instance to use http module to create a server
const server = http.createServer(app);

// function to start the server
async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server started @ http://localhost:${PORT}`);
  });
}

// Instantiate the server
startServer();

// Export for testing
export default app;
