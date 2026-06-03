import express, {} from 'express';
const app = express(); // Created an instance of the express.
app.get('/ping', (_req, res) => {
    return res.json({
        message: "pong"
    });
});
app.listen(3000, () => {
    console.log("Server Running at Port: 3000");
});
//# sourceMappingURL=index.js.map