import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

// Create a native PostgreSQL ENUM
export const userRoleEnum = pgEnum('role', ['admin', 'user', 'superadmin']);

export const userTable = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  firstname: varchar('firstname', { length: 256 }).notNull(),
  lastname: varchar('lastname', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  address: text('address'),
  phone: varchar('phone', { length: 256 }),
  role: userRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

