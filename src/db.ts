import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number.parseInt(process.env.PORT as string),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  subscribers: [],
  migrations: [],
});
