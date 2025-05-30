import {
  pgTable,
  varchar,
  text,
  doublePrecision,
  integer,
} from 'drizzle-orm/pg-core';

export const productTable = pgTable('products', {
  pid: varchar('pid', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  price: doublePrecision('price'),
  image: varchar('image', { length: 1000 }),
  quantity: integer('quantity'),
});