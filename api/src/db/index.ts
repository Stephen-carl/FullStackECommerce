// import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from "pg";

// create the database connection and gives it to drizzle
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});


const db = drizzle(pool);

export default db;
