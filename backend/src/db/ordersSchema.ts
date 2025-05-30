import { doublePrecision, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./userSchema";
import { productTable } from "./productSchema";

export const ordersTable = pgTable('orders', {
    oid: integer('oid').primaryKey().generatedAlwaysAsIdentity(),
    createdAt : timestamp('created_at').notNull().defaultNow(),
    status : varchar('status',{ length : 50 }).notNull().default('new'),
    // to identify the user who made the order
    userId: serial('user_id')
    .references(() => userTable.id)
    .notNull()
})

// an order can have multiple products, and a product can be in multiple orders
// so i need to add additional fields for many-many relationship
export const orderItemsTable = pgTable('order_items', {
    oiid : integer('oiid').primaryKey().generatedAlwaysAsIdentity(),
    // i have to know what order the item is under and which product it is
    // many to many relationship
    orderId : integer('order_id')
    .references(() => ordersTable.oid)
    .notNull(),
    productId : varchar('product_id', { length: 255 })
    .references(() => productTable.pid)
    .notNull(),
    quantity : integer('quantity').notNull(),
    price: doublePrecision('price_per_unit').notNull()
})