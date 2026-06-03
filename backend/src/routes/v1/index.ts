import express, {type Request, type Response} from "express";

const v1Router = express.Router();

v1Router.get('/ping', (_req: Request, res: Response) => { // _req means that req is declared but not used and we want to remove that warning so we added _ in front of request.
    return res.json({
        message: "pong"
    });
});

export default v1Router;