import express, { Application, Response, Request } from 'express';
import routes from './routes';
import connectDb from './db';
import errorHandler from './middleware/errors';
import notFound from './middleware/errors/notFound';
import { config } from 'dotenv';
import consola from 'consola';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Application = express();

config();
connectDb();
app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
  res.send('Hellso!');
});
app.use('/api', routes);

//Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = parseInt(process.env.API_PORT as string);
app.listen(PORT, () => {
  consola.info(`Server Running at  http://localhost:${PORT}`);
});
