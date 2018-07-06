const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const logger = require('koa-logger')

const serverDir = './server/';
const schema = require(`${serverDir}schema.js`);

const app = new Koa();

app.use(logger());
app.use(mount('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))
);

app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));
