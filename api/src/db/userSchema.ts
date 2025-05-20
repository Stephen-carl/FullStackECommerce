import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable  = pgTable('users',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    email: varchar({length: 255}).notNull().unique(),
    password: varchar({length: 255}).notNull(),
    role: varchar({length: 255}).notNull().default('user'),

    name: varchar({length: 255}),
    address: text(),
    phone: varchar({length: 255}),
});

// we have to omit the role so that the user doesn't trick the system to set himself as something else
export const createUsersSchema = createInsertSchema(usersTable).omit({
    role: true
})

// pick instead of omitting
export const loginSchema = createInsertSchema(usersTable).pick({
    email: true,
    password: true
})