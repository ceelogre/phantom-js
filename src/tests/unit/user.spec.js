import pkg from 'mocha'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import * as userController from '../../controllers/user.js'
const {it, describe} = pkg

chai.use(chaiAsPromised)
chai.should()
const fakeUserId = 3

describe('User unit tests suite', () => {
  it('should not create a empty user', () => {
    const user = {}
    return userController.createUser(user)
      .should.be.rejected
  })
  it('list of users should be empty',() => {
    return userController.getUsers()
      .should.be.empty
  })
  it('should not find any user', () => {
    return userController.getUser(fakeUserId)
      .should.be.empty
  })
  it('should not update a non existing user', () => {
    return userController.updateUser(fakeUserId)
      .should.be.fulfilled // Look into how to make this fail at first
  })
  it('should not delete a non-existing user', () => {
    return userController.deleteUser(fakeUserId)
      .should.be.fulfilled // Should fail at first
  })
})