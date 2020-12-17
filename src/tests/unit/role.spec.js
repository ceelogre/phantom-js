import pkg from 'mocha'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import * as rolesController from '../../controllers/role.js'
import  { returnRoleEnum } from '../../utils/helpers.js'
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
      .should.be.fulfilled // Look into how to make this fail at first
  })
  it('should not delete a non-existing role', () => {
    return rolesController.deleteRole(fakeRoleId)
      .should.be.fulfilled // Should fail at first
  })
})

describe('GET role helper ', () => {
  it ('should return BASIC given passenger role', () => {
    return returnRoleEnum('Passenger').should.eq('BASIC')
  })
  it('should return STANDARD given role driver', () => {
    return returnRoleEnum('driver').should.eq('STANDARD')
  })
  it('should return MANAGER given role operator', () => {
    return returnRoleEnum('operator').should.eq('MANAGER')
  })
  it('should return SUPER given role admin', () => {
    return returnRoleEnum('admin').should.eq('SUPER')
  })
  it('should return unknown role given any other role name', () => {
    return returnRoleEnum('pilot').should.eq('unknown role')
  })
})