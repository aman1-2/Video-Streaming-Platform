import express, {type Express} from 'express';

import { PORT } from './config/server.config.js';
import apiRouter from './routes/index.js';

const app: Express = express(); // Created an instance of the express.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server Running at Port: ${PORT}`);
});