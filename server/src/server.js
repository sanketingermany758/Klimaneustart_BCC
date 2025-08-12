import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import conversationsRouter from './routes/conversations.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/v1/conversations', conversationsRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/klima';
const PORT = Number(process.env.PORT || 4000);

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, { autoIndex: true });
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
    } catch (e) {
        console.error('Failed to start server', e);
        process.exit(1);
    }
};

start();


