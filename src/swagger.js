import swaggerJsDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Phantom backend',
    version: '1.0.0',
    description: 'Phantom API',
  },
}
const options = {
  swaggerDefinition,
  apis: ['./src/index.js', './src/routes/*.js'],
}

const openAPISpec = swaggerJsDoc(options)
export default openAPISpec