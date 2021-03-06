const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');

const { typeDefs, resolvers } = require("./schemas"); //PENDING TO ADD TYPEDEFS AND RESOLVERS
const { type } = require('os');
const app = express();
const PORT = process.env.PORT || 3001;
const { authMiddleware } = require("./utils/auth")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
    console.log(`GraphQL running at http://localhost:${PORT}${server.graphqlPath}`);
  })
}

startApolloServer(typeDefs, resolvers);