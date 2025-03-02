import { Request, Response } from 'express'
import db from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(users)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, age } = req.body
        await db.insert(users).values({ name, email, age })
        res.status(201).json({ message: 'User created!' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create user' })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id)
        const result = await db.select().from(users).where(eq(users.id, userId))

        if (!result.length) {
            res.status(404).json({ message: 'User not found' })
        } else {
            res.json(result[0])
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch user' })
    }
}
