import path from 'path';
import cors from 'cors';
import express from 'express';

// Create Express server
const app = express();

// Middleware to allow cross-origin requests
app.use(cors({ origin: 'http://localhost:63342' }));
app.use(express.static(path.join(__dirname, '..', 'client')));

export default app;
