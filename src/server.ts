import 'dotenv/config'
import express, { Request, Response } from 'express'
import db from './db'
import { users } from './db/schema'
import { eq } from 'drizzle-orm'
import { createTenantSchema } from './db/tenantService'
import { createProductsTable } from './db/queries/products'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, TypeScript + Express! WOW' })
})

// Fetch all users
app.get('/users', async (req, res) => {
    const result = await db.select().from(users)
    res.json(result)
    console.log('hey')
})

// Create a new user
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body
    await db.insert(users).values({ name, email, age })
    res.status(201).json({ message: 'User created!' })
})

// Get a user by ID
app.get('/users/:id', async (req, res) => {
    const userId = Number(req.params.id)
    const result = await db.select().from(users).where(eq(users.id, userId))
    res.json(result)
})

app.post('/tenants', async (req, res) => {
    try {
        const { tenant } = req.body
        await createTenantSchema(tenant)
        res.status(201).json({ message: tenant })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/products', async (req, res) => {
    try {
        createProductsTable()
        res.status(201).json({ message: 'Product Table created!' })
    } catch (error) {
        console.log('❌ Error creating table:', error)
        res.status(500).json({ error: error })
    }
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})
