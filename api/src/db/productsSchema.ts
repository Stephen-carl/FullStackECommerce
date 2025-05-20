import { integer, pgTable, varchar, text, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255}),   // url to image
  price: doublePrecision().notNull(),
});

// generatedAlwaysAsIdentity - this method helps not to use an omit()
export const createProductSchema = createInsertSchema(productsTable)

export const updateProductSchema = createInsertSchema(productsTable).partial()
 