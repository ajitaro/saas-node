import { Router } from 'express'
import { getUsers, createUser, getUserById } from './controller'

const router = Router()

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUserById)

export default router
