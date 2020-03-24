require("dotenv-safe").config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || 8069;

const APP_NAME = process.env.APP_NAME || "app-name";
const PORT = process.env.PORT;

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = require("./src/app");

if (cluster.isMaster) {
  console.log("====================================================");
  console.log(`${process.env.APP_NAME}`);
  console.log("====================================================");
  console.log(`${APP_NAME} -> Running process MASTER`);
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `${APP_NAME} -> !!!ATENTION!!!! Worker ${worker.process.pid} killed: ${code}, and signal: ${signal}`
    );
    console.log(`${APP_NAME} -> Starting a new worker`);
    cluster.fork();
  });
} else {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`${APP_NAME} -> Running on port: ${PORT}`);
    console.log(
      `${APP_NAME} -> Running process ${
        cluster.isMaster ? "master" : "child"
      }!\n`
    );
  });
}
