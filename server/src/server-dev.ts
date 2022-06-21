import express from 'express';
// import next from 'next';
import path from 'path';
import { config as dotenv } from 'dotenv';
import fileUpload from 'express-fileupload';
import fs from 'fs/promises';
import cors from 'cors';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';

dotenv();

const dev = process.env.NODE_ENV !== 'production';

const PORT = process.env.PORT;

// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();

// Routers
import { UseRoutesToApp } from './server';

const corsOption = {
    origin: ['http://localhost:3000'],
};

const startServer = () => {
    const app = express();

    mongoose
        .connect(process.env.DATABASE_URL as string)
        .then(() => console.log('DB connected'))
        .catch((e: any) => console.log(e));

    app.use(express.json());
    app.use(cors(corsOption));
    app.use(express.urlencoded({ extended: false }));

    app.use(express.static(path.resolve('server', 'uploads')));
    app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
    fs.mkdir(path.resolve('server', 'uploads'), { recursive: true });

    UseRoutesToApp(app);

    // app.use('/api/util', utilRouter);

    app.listen(PORT, () => console.log(`Server running in port --> ${PORT}`));
};
startServer();
