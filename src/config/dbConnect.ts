import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = "mysql";

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
	host: dbHost,
	dialect: dbDialect
});

export default sequelizeConnection;