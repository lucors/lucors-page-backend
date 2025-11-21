import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    max: 10,
    idleTimeoutMillis: 30000,
});
