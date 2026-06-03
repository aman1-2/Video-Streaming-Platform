import express, {type Express, type Request, type Response} from 'express';

const app: Express = express(); // Created an instance of the express.

app.get('/ping', (_req: Request, res: Response) => { // _req means that req is declared but not used and we want to remove that warning so we added _ in front of request.
    return res.json({
        message: "pong"
    });
});

app.listen(3000, () => {
    console.log("Server Running at Port: 3000")
});