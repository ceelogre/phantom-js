import express from 'express'
const router = express.Router()
import * as roleController from '../controllers/role.js'
import logger from '../utils/logger.js'

router.get('/', (req, res) => {
  roleController.getRoles()
    .then(
      (results) => {
        res.json(results)
      }
    )
    .catch(
      (error) => {
        let message = res.__('roles_not_retrieved')
        logger(res, error, message, 400)
      }
    )
})

router.post('/', (req, res) => {
  const role = req.body
  roleController.createRole(role)
    .then(
      (results) => {
        res.status(201).json(results)
      }
    )
    .catch(
      (error) => {
        let message = res.__('role_not_saved')
        logger(res, error, message, 400)
      }
    )
})

router.get('/:id', (req, res) => {
  try {
    roleController.getRole(req.params.id)
      .then(
        results => {
          let status = 200
          if (results.length == 0) {
            let message = res.__('role_404')
            status = 404
            return res.status(status).json({
              message
            })
          }
          res.status(status).json({
            results,
          })
        }
      )
      .catch(
        error => {
          console.error(error)
          res.json({
            message: res.__('roles_not_retrieved')
          })
        }
      )
  } catch (error) {
    console.error(error)
  }

})
router.put('/:id', (req, res) => {
  const role = req.body
  roleController.updateRole(req.params.id, role)
    .then(
      results => {
        let message = res.__('role_update_successful')
        let status = 200
        if (results[0] == 0) {
          message = res.__('role_404')
          status = 404
        } 
        res.status(status).json({
          message,
          results
        })
      }
    )
    .catch(
      error => {
        console.error(error)
        res.status(500).json({
          message: res.__('role_not_updated')
        })
      }
    )
})

router.delete('/:id', (req, res) => {
  roleController.deleteRole(req.params.id)
    .then(
      (results ) => {
        let message = res.__('role_deleted')
        let status = 200
        if(results == 0) {
          message = res.__('role_404')
          status = 404
        }
        res.status(status).json({
          results,
          message
        })
      }
    )
    .catch(
      error => {
        res.status(500).json({
          message: res.__('role_not_deleted')
        })
        console.error(error)
      }
    )
})

router.use('*', (req, res) => {
  res.status(404).json({
    message: 'Unknown ROLE route, check id for example'
  })
})
export default router