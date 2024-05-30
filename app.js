const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());

connectDatabase();

const keyRoutes = require("./routes/keyRoutes");
app.use("/api", keyRoutes);

const { releaseBlockedKeys, deleteExpiredKeys } = require("./utils/periodicTasks");

setInterval(releaseBlockedKeys, 10000); 

setInterval(deleteExpiredKeys, 60000); 

module.exports = app;

