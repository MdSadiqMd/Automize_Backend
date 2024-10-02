import express from "express";
import bodyParser from "body-parser";

import { serverConfig, logger } from "./config";
import apiRouter from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, async () => {
    logger.info(`server started at PORT: ${serverConfig.PORT}`);
});