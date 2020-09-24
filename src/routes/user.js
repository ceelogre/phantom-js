import express from 'express'
const router = express.Router()
import * as userController from '../controllers/user'

router.get('/', (req, res) => {
  userController.getUsers()
    .then(
      (results) => {
        res.json(results)
      }
    )
    .catch(
      (error) => {
        res.json('An error occured while retrieving users.')
        console.error(error)
      }
    )
})

router.post('/', (req, res) => {
  const user = req.body
  userController.createUSer(user)
    .then(
      (results) => {
        res.json(results)
      }
    )
    .catch(
      (error) => {
        res.json('An error occured while saving')
        console.error(error)
      }
    )
})
export default router