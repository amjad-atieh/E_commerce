import pgp from "pg-promise";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const pgInstance = pgp();

const db = pgInstance({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "e_commerce",
  user: process.env.DB_USER || "e_commer",
  password: process.env.DB_PASSWORD || "password123",
});

export default db;