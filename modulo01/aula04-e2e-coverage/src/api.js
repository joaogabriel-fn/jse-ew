const http = require('http')

const DEFAULT_USER = {
  username: 'whysk4s',
  password: '123'
}

// curl -X POST --data '{"username": "whYsk4s", "password": "123"}' localhost:3000/login
// retorna um buffer 

const { once } = require('events')

const routes = {
  '/contact:GET': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:POST': async (request, response) => {
    const user = JSON.parse(await once(request, 'data'))
    const toLower = (text) => text.toLowerCase()
    if (
      toLower(user.username) !== toLower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401) // Retorna Unauthorized
      response.end('Log in failed!')
      return
    }
    // console.log('data', data.toString())
    // toString irá converter o buffer retornado, mas se parseado pra JSON não tem necessidade

    return response.end('Log in succeeded!')
  },
  default(request, response) {
    response.writeHead(404) // Retorna not found
    return response.end('not found!')
  }
}

const handler = (request, response) => {
  const { url, method } = request
  // console.log({ url, method })
  const routeKey = `${url.toLowerCase()}:${method}`
  // console.log({ routeKey })
  const chosen = routes[routeKey] || routes.default
  return chosen(request, response)
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('running at 3000'))


module.exports = app
