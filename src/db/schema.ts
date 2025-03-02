import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

/**
 * Public
 */
export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique()
})

export const products = pgTable('products', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    price: integer().notNull(),
    category: varchar({ length: 255 }).notNull()
})
