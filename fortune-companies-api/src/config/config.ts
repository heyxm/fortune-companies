import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.HOSTNAME || "localhost";
const DB_NAME = process.env.DB_NAME || "fortune_companies";
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin";

const MYSQL = {
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USERNAME,
  pass: DB_PASSWORD,
};

const SERVER_HOST = process.env.HOSTNAME || "localhost";
const SERVER_PORT = process.env.PORT || 3000;

const SERVER = {
  hostname: SERVER_HOST,
  port: SERVER_PORT,
};

const config = {
  mysql: MYSQL,
  server: SERVER,
};

export default config;
