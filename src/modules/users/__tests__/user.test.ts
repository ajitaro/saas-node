import request from 'supertest'
import app from '@/server'
import db from '@/db'

jest.mock('@/db') // Mock the database

describe('Users API', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should fetch all users', async () => {
        // Mock DB response
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 }
        ]
        db.select = jest
            .fn()
            .mockReturnValue({ from: jest.fn().mockResolvedValue(mockUsers) })

        const response = await request(app).get('/users')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockUsers)
    })

    it('should return 500 if fetching users fails', async () => {
        // Mock DB to throw an error
        db.select = jest.fn().mockImplementation(() => ({
            from: jest.fn().mockRejectedValue(new Error('Database error'))
        }))

        const response = await request(app).get('/users')

        expect(response.status).toBe(500)
        expect(response.body).toEqual({ error: 'Failed to fetch users' })
    })

    it('should create a new user', async () => {
        const newUser = { name: 'Jane Doe', email: 'jane@example.com', age: 25 }

        db.insert = jest.fn().mockReturnValue({
            values: jest.fn().mockResolvedValue(undefined)
        })

        const response = await request(app).post('/users').send(newUser)

        expect(response.status).toBe(201)
        expect(response.body).toEqual({ message: 'User created!' })
    })

    it('should return 500 if user creation fails', async () => {
        const newUser = { name: 'Jane Doe', email: 'jane@example.com', age: 25 }

        db.insert = jest.fn().mockImplementation(() => ({
            from: jest.fn().mockRejectedValue(new Error('Database error'))
        }))

        const response = await request(app).post('/users').send(newUser)

        expect(response.status).toBe(500)
        expect(response.body).toEqual({ error: 'Failed to create user' })
    })

    it('should fetch a user by ID', async () => {
        const mockUser = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            age: 30
        }

        db.select = jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
                where: jest.fn().mockResolvedValue([mockUser])
            })
        })

        const response = await request(app).get('/users/1')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockUser)
    })

    it('should return 404 when user is not found', async () => {
        db.select = jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
                where: jest.fn().mockResolvedValue([])
            })
        })

        const response = await request(app).get('/users/999')

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'User not found' })
    })

    it('should return 500 if fetching user by ID fails', async () => {
        db.select = jest.fn().mockImplementation(() => ({
            from: jest.fn(() => ({
                where: jest.fn().mockRejectedValue(new Error('Database error'))
            }))
        }))

        const response = await request(app).get('/users/1')

        expect(response.status).toBe(500)
        expect(response.body).toEqual({ error: 'Failed to fetch user' })
    })
})
