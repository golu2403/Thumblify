import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from './config/db.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import AuthRouter from "./route/authRote.js";
import ThumbnailRouter from "./route/thumbnailRoute.js";
import UserRouter from "./route/userRout.js";

declare module 'express-session' {
  interface SessionData {
    userId: string;
    isLoggedIn: boolean;
  }
}

await connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}))
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI as string,
        collectionName: 'sessions',
    })
}));



const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/auth',AuthRouter);
app.use('/api/user',UserRouter)
app.use("/api/thumbnail",ThumbnailRouter);

// app.use("/api/user", UserRouter);






app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});