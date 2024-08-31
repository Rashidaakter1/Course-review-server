import app from "./app";
import config from "./config";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;
async function main() {
  await mongoose.connect(config.database__url as string);

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

main();

//For  asynchronous  function
process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// This is for synchronous function
process.on("uncaughtException", () => {
  process.exit(1);
});
