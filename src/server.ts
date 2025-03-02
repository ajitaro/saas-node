import 'dotenv/config'
import express, { Request, Response } from 'express'
import { createTenantSchema } from './db/tenantService'
import { createProductsTable } from './db/queries/products'
import userRoutes from './modules/users/routes'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, TypeScript + Express! WOW' })
})

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' })
})

app.use('/users', userRoutes)

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

export default app

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
}
