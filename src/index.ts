import express from 'express'
import bodyParser from "body-parser";

import { serverConfig, logger } from "./config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.listen(serverConfig.PORT, async () => {
    logger.info(`server started at PORT: ${serverConfig.PORT}`);
});