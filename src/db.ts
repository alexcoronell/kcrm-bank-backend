import { DataSource } from "typeorm"

/* Entities */
import { User } from "./entities/User.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "kcrm-bank",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})