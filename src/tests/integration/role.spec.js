import pkg from 'mocha'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import { sudo } from '../../utils/sudo.js'
chai.use(chaiHttp)
chai.use(chaiAsPromised)
chai.should()

const {before, it, describe} = pkg

const expectedRole =  {
  name: 'driver',
  type: 'normal'
}
before(() => {
  return chai.request(app)
    .post('/roles')
    .type('json')
    .set('sudo', sudo)
    .send(expectedRole)
    .then ()
    .catch(
      error => {
        console.error('Role not created ', error)
      }
    )
})
describe('Create roles integration test suite', () => {
  it('should not allow a request without token', () => {
    return chai.request(app)
      .post('/roles')
      .type('json')
      .send(expectedRole)
      .should.eventually.have.a.deep.property('body', {
        message: 'Requires authorization token'
      })
  })
  it('should not allow an invalid token', () => {
    return chai.request(app)
      .post('/roles')
      .type('json')
      .send(expectedRole)
      .set('sudo', 'made up key')
      .should.eventually.have.a.deep.property('body', {
        message: 'Token malformed'
      })
  })
  it('should not save a role without name property', () => {
    delete expectedRole.name
    const requester =  chai.request(app)
      .post('/roles')
      .type('json')
      .send(expectedRole)
      .set('sudo', sudo)

    return Promise.all([
      requester.should.eventually.have.a.property('body'),
      requester.should.eventually.have.a.property('status', 400),
      requester.should.eventually.have.a.deep.property('body', {
        message: 'Unable to save role'
      })
    ])
      .then(res => console.info(res))
  })
  it('should save a role with name and type properites', () => {
    expectedRole.name = 'operator'
    const requester =  chai.request(app)
      .post('/roles')
      .type('json')
      .send(expectedRole)
      .set('sudo', sudo)

    return Promise.all([
      requester.should.eventually.have.a.property('body'),
      requester.should.eventually.have.a.property('status', 201),
      requester.should.eventually.have.a.property('body')
        .that.has.keys('id', 'name', 'type', 'createdAt', 'updatedAt')
    ])
  })
})
describe('GET roles suite', () => {
  it('should not allow a request without a token', () => {
    return chai.request(app)
      .get('/roles')
      .should.eventually.have.a.deep.property('body', {
        message: 'Requires authorization token'
      })
  })
  it('should not allow an invalid token', () => {
    const requester = chai.request(app)
      .get('/roles')
      .set('sudo', 'w3jpX.zadgh.ghpuzS')
    return Promise.all([
      requester.should.eventually.have.a.property('status', 403),
      requester.should.eventually.have.a.deep.property('body', {
        message: 'Unauthorized'
      })
    ])
  }),
  it('should not allow any other auth header', () => {
    const requester = chai.request(app)
      .get('/roles')
      .set('Bearer', 'w3jpX.zadgh.ghpuzS')
    return Promise.all([
      requester.should.eventually.have.a.property('status', 403),
      requester.should.eventually.have.a.deep.property('body', {
        message: 'Requires authorization token'
      })
    ])
  })
  it('should fetch all roles given auth', () => {
    const requester = chai.request(app)
      .get('/roles')
      .set('sudo', sudo)
    return Promise.all([
      requester.should.eventually.have.a.property('status', 200),
      requester.should.eventually.have.a.property('body')
        .that.has.lengthOf(2)
    ])
  })
})
describe('GET role suite', () => {
  let roleId = 4
  it('should not accept a request without a token', () => {
    return chai.request(app)
      .get(`/roles/${roleId}`)
      .should.eventually.have.a.deep.property('body', {
        message: 'Requires authorization token'
      })
  })
  it('should not accept a request with an invalid token', () => {
    return chai.request(app)
      .get(`/roles/${roleId}`)
      .set('sudo', 'matter to you')
      .should.eventually.have.a.deep.property('body', {
        message: 'Token malformed'
      })
  })
  it('should return 404 if role id is not found', () => {
    return chai.request(app)
      .get(`/role/${roleId}`)
      .set('sudo', sudo)
      .should.eventually.have.a.property('status', 404)
  })
  it('should get role details given a valid id', () => {
    roleId = 1
    const requester = chai.request(app)
      .get(`/roles/${roleId}`)
      .set('sudo', sudo)
    return Promise.all([
      requester.should.eventually.have.a.property('status', 200),
      requester.should.eventually.have.a.property('body')
        .that.has.property('results')
        .that.is.an('array')
        .that.has.property('0')
        .that.has.keys(['name', 'type', 'createdAt', 'updatedAt', 'id'])
    ])
      .then(res => console.info(res))
  })
})

describe('PUT roles suite', () => {
  it('should not accept a request without a token', () => {
    return chai.request(app)
      .put('/roles')
      .should.eventually.have.a.deep.property('body', {
        message: 'Requires authorization token'
      })
  })
  it('should not accept a request with an invalid token', () => {
    return chai.request(app)
      .put('/roles')
      .set('sudo', 'matter to you')
      .should.eventually.have.a.deep.property('body', {
        message: 'Token malformed'
      })
  })
  it('should return an empty result in case role does not exist', () => {
    const id=939
    const requester = chai.request(app)
      .put(`/roles/${id}`)
      .set('sudo', sudo)
      .send({
        name:'pilot'
      })
    return Promise.all([
      requester.should.eventually.have.a.property('status', 404),
      requester.should.eventually.have.a.deep.property('body', {
        message: 'Role not found',
        results: [
          0
        ]
      })
    ])
  })
  it('should not accept any other property other than name  or type ', () => {
    const id = 2
    const requester = chai.request(app)
      .put(`/roles/${id}`)
      .set('sudo', sudo)
      .send({
        nam: 'driver'
      })
    return Promise.all([
      requester.should.eventually.have.a.property('status', 404),
      requester.should.eventually.have.a.deep.property('body', {
        message: 'Role not found',
        results: [
          0
        ]
      })
    ])
  })
  it('should update an existing role', () => {
    const id = 1
    const requester = chai.request(app)
      .put(`/roles/${id}`)
      .set('sudo', sudo)
      .send({
        name: 'pilot'
      })
    return Promise.all([
      requester.should.eventually.have.a.property('status', 200),
      requester.should.eventually.have.a.deep.property('body', {
        message: 'Role has been successfully updated',
        results: [
          1
        ]
      })
    ])
  })
})
describe('DELETE role suite', () => {
  it('should not accept a request without a token', () => {
    return chai.request(app)
      .delete('/roles')
      .should.eventually.have.a.deep.property('body', {
        message: 'Requires authorization token'
      })
  })
  it('should not accept a request with an invalid token', () => {
    return chai.request(app)
      .delete('/roles')
      .set('sudo', 'oh yeah!')
      .should.eventually.have.a.deep.property('body', {
        message: 'Token malformed'
      })
  })
  it('should not allow a token that is non admin', () => {
    //To be implemented after drivers
  })
  it('should not accept a requester without a role id', () => {
    return chai.request(app)
      .delete('/roles')
      .set('sudo', sudo)
      .should.eventually.have.a.property('status', 404)
  })
  it('should delete a role given the right credentials and id', () => {
    const id=2
    const requester = chai.request(app)
      .delete(`/roles/${id}`)
      .set('sudo', sudo)
    return Promise.all([
      requester.should.eventually.have.a.property('status', 200),
      requester.should.eventually.have.a.deep.property('body', {
        message: 'Role has been deleted successfully',
        results: 1
      })
    ])
  })
})