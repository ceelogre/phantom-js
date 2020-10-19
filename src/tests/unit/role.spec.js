import pkg from 'mocha'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import * as rolesController from '../../controllers/role.js'
const {it, describe} = pkg

chai.use(chaiAsPromised)
chai.should()
const fakeRoleId = 3

describe('Role unit tests suite', () => {
  it('should not create a empty role', () => {
    const role = {}
    return rolesController.createRole(role)
      .should.be.rejected
  })
  it('list of roles should be empty',() => {
    return rolesController.getRoles()
      .should.be.empty
  })
  it('should not find any role', () => {
    return rolesController.getRole(fakeRoleId)
      .should.be.empty
  })
  it('should not update a non existing role', () => {
    return rolesController.updateRole(fakeRoleId)
      .should.be.rejected
  })
  it('should not delete a non-existing role', () => {
    return rolesController.deleteRole(fakeRoleId)
      .should.be.rejected
  })
})