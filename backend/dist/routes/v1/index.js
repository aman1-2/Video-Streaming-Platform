import express, {} from "express";
import videoRouter from "./video.routes.js";
const v1Router = express.Router();
v1Router.use('/videos', videoRouter);
v1Router.get('/ping', (_req, res) => {
    return res.json({
        message: "pong"
    });
});
export default v1Router;
//# sourceMappingURL=index.js.map