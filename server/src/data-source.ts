import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "./entity/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ["dist/migrations/*.js"],
    subscribers: [],
})