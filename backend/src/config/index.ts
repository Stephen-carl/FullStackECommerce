import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;

config();

const pool = new Pool({
  connectionString: process.env.DB_URL, 
  // Or, if you prefer named params:
  // host:     process.env.DB_HOST,
  // port:     Number(process.env.DB_PORT),
  // user:     process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
});

const db = drizzle(pool)
export default db;

// import { drizzle } from 'drizzle-orm/mysql2' ;
// import mysql from 'mysql2/promise';
// config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// const  db = drizzle(pool);
// export default db;
