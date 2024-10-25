import http from "http";
import bodyParser from "body-parser";
import express from "express";
import log from "./config/logs";
import config from "./config/config";
import companyRoutes from "./routes/companyRoutes";

const NAMESPACE = "Server";
const router = express();

router.use((req, res, next) => {
    log.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}]`);

  res.on("finish", () => {
    log.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

router.use("/companies", companyRoutes);

router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () =>
    log.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
