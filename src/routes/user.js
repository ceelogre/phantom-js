import express from 'express'
const router = express.Router()
import * as userController from '../controllers/user.js'

/** 
 * @openapi
 * /users:
 *  get:
 *     description: Get all users 
 *     tags:
 *        - Users
 *     responses:
 *       200:
 *         description: Returns a list of users
*/
router.get('/', (req, res) => {
  userController.getUsers()
    .then(
      (results) => {
        res.json(results)
      }
    )
    .catch(
      (error) => {
        res.json({
          message: res.__('users_not_retrieved')
        })
        console.error('-----\n', error, '\n\n--------')
      }
    )
})

router.post('/', (req, res) => {
  const user = req.body
  userController.createUser(user)
    .then(
      (results) => {
        res.json(results)
      }
    )
    .catch(
      (error) => {
        res.json({
          message: res.__('users_not_saved')
        })
        console.error(error)
      }
    )
})

router.get('/:id', (req, res) => {
  try {
    userController.getUser(req.params.id)
      .then(
        results => 
          results.length == 0 ? res.json('404_user'): 
            res.json(results)
      )
      .catch(
        error => {
          console.error(error)
          res.__('user_not_retrieved')
        }
      )
  } catch (error) {
    console.error(error)
  }

})
router.put('/:id', (req, res) => {
  const user = req.body
  userController.updateUser(req.params.id, user)
    .then(
      results => {
        results.length == 1 ? res.__('user_update_sucessful') :
          res.json(results)
      }
    )
    .catch(
      error => {
        console.error(error)
        res.__('user_not_updated')
      }
    )
})

router.delete('/:id', (req, res) => {
  userController.deleteUser(req.params.id)
    .then(
      results => res.json(results)
    )
    .catch(
      error => {
        res.json('Unable to delete user')
        console.error(error)
      }
    )
})
export default router