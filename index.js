// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const path = require('path')

// Register plugins
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
});
// second plugin
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public/assets'),
  prefix: '/assets', // optional: default '/'
  decorateReply: false // the reply decorator has been added by the first plugin registration
});
// third plugin
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public/forms'),
  prefix: '/forms', // optional: default '/'
  decorateReply: false // the reply decorator has been added by the first plugin registration
});

// Declare a route
fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

// Declare a route
fastify.get('/apaya', async (request, reply) => {
    return { hello: 'apaya' }
  });

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();