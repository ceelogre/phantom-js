import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import assert from 'assert'
import pkg from 'mocha'

const {before, describe, it} = pkg

chai.use(chaiHttp)
const expectedObj =  {
  username: 'PnL',
}
before(() => {
  return chai.request(app)
    .post('/users')
    .type('json')
    .send(expectedObj)
    .then ()
    .catch(
      error => {
        console.error('User not created ', error)
      }
    )
})
describe('Get all users suite', () => {
  it(' should return all users', () => {
    return chai.request(app)
      .get('/users')
      .then(
        res => {
          assert.strictEqual(res.status, 200, 'Unexpected status code was returned')
          assert(typeof(res.body) == 'object', 'Data returned is not in object format.')
        }
      )
  })
  it(' should return a specific user', () => {
    return chai.request(app)
      .get('/users')
      .then(
        res => {
          assert.deepStrictEqual(res.body[0].username, expectedObj.username, 'Expected object not found in the body.')
        }
      )
  })
})