import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import resizingImage from './inputValidation';

// Create Express server
const app = express();
app.use(helmet());

// Middleware to allow cross-origin requests
app.use(cors());
app.use(resizingImage());
app.use(express.static(path.join(__dirname, '..', 'client')));

export default app;
