const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('API Suite test', () => {
  let app
  before(done => {
    app = require('./api')
    app.once('listening', done)
  })
  after(done => app.close(done))

  describe('/contact:GET', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200)

      assert.strictEqual(response.text, 'contact us page')
    })
  })

  describe('/login:POST', () => {
    it('should request the login and return HTTP status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: "whysk4s", password: "123" })
        .expect(200)

      assert.strictEqual(response.text, 'Log in succeeded!')
    })

    it('should request the login and return HTTP status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: "whsk4s", password: "123" })
        .expect(401)
        
        assert.ok(response.unauthorized)
      assert.strictEqual(response.text, 'Log in failed!')
    })
  })

  describe('/hi:GET', () => {
    it('should request an existing page and return HTTP Status 404', async () => {
      const response = await supertest(app)
        .post('/hi')
        .expect(404)

      assert.strictEqual(response.text, 'not found!')
    })
  })
})