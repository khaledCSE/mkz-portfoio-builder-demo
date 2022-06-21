import express, { NextFunction, Request, Response, Application } from "express";
import next from "next";
import path from "path";
import { config as dotenv } from "dotenv";
// import { connectDB } from './config/db.config';
// import logger from './config/logger';
import fileUpload from "express-fileupload";
import fs from "fs/promises";
import cors from "cors";
import mongoose from "mongoose";

const NAMESPACE = "Server";

dotenv();

const dev = process.env.NODE_ENV !== "production";

const PORT = process.env.PORT;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Routers
// import movieRouter from './routers/movie.router';
import authRouter from "./routers/auth.router";

export const UseRoutesToApp = (app: Application) => {
    // app.use('/api/movies', movieRouter);
    app.use("/api/auth", authRouter);
    app.use("/uploads", express.static(path.resolve("server", "uploads")));
};

nextApp
    .prepare()
    .then(async () => {
        const app = express();

        mongoose
            .connect(process.env.DATABASE_URL as string)
            .then(() => console.log("DB connected"))
            .catch((e: any) => console.log(e));

        app.use(express.json());
        app.use(cors());
        app.use(express.urlencoded({ extended: false }));
        // app.use(cors());
        app.use(express.static(path.resolve("server", "uploads")));
        app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
        await fs.mkdir(path.resolve("server", "uploads"), { recursive: true });

        UseRoutesToApp(app);

        app.get("*", (req: Request, res: Response) => handle(req, res));

        app.listen(PORT, () =>
            console.log(`Server running in port --> ${PORT}`)
        );
    })
    .catch((reason) => console.log(reason));
