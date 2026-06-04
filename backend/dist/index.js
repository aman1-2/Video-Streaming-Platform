import express, {} from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import { PORT } from './config/server.config.js';
import apiRouter from './routes/index.js';
const app = express(); // Created an instance of the express.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(path.join(__dirname, '../output'));
app.use('/output', cors(), express.static(path.join(__dirname, '../output')));
app.listen(PORT, () => {
    console.log(`Server Running at Port: ${PORT}`);
});
//# sourceMappingURL=index.js.map