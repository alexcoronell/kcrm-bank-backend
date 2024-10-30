import { DataSource } from "typeorm";

/* Entities */
import { Franchise } from "./entities/Franchise.entity";
import { Sale } from "./entities/Sale.entity";
import { User } from "./entities/User.entity";
import { UserType } from "./entities/UserType.entity";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "root",
	database: "kcrm-bank",
	synchronize: true,
	logging: true,
	entities: [User, UserType, Sale, Franchise],
	subscribers: [],
	migrations: [],
});
