import { serial, varchar, integer, pgSchema } from 'drizzle-orm/pg-core'

const products = {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    price: integer('price').notNull(),
    category: varchar({ length: 255 }).notNull()
}

const orders = {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    productId: integer('product_id').notNull(),
    quantity: integer('quantity').notNull(),
    total: integer('total').notNull()
}

export const getTenantTable = (tenant: string) => {
    const schema = pgSchema(tenant)

    console.log('getTenantTable', schema.schemaName)

    return {
        products: schema.table('products', products),
        orders: schema.table('orders', orders)
    }
}
