import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "kcrm-bank",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})