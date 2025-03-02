import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle({
    connection: process.env.DATABASE_URL ?? '',
    casing: 'snake_case'
})

export default db
