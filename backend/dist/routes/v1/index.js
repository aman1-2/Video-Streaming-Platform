import express, {} from "express";
const v1Router = express.Router();
v1Router.get('/ping', (_req, res) => {
    return res.json({
        message: "pong"
    });
});
export default v1Router;
//# sourceMappingURL=index.js.map