import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";
const port = 3000;

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(port);
    console.log('Database connected');
    console.log("Server is listening on port ", port);
  } catch (e) {
    console.error(e);
  }
}

main();
