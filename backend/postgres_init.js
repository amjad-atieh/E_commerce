import pgp from "pg-promise";

const pgInstance = pgp();

const db = pgInstance({
  host: "localhost",
  port: 5432,
  database: "e_commerce",
  user: "e_commer",
  password: "password123",
});

export default db;