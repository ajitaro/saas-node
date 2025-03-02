import { sql } from 'drizzle-orm'
import db from '..'

export const createProductsTable = async () => {
    db.execute(sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR(255) NOT NULL
      );
    `)
    console.log("✅ Table 'products' created successfully.")
}
