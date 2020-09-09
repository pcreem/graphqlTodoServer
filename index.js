const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { GraphQLServer } = require('graphql-yoga')

const Query = require('./resolvers/query.js')
const Mutation = require('./resolvers/mutation.js')
const User = require('./resolvers/user.js')
const Post = require('./resolvers/post.js')

const resolvers = {
  Query,
  Mutation,
  User,
  Post
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

const PORT = process.env.PORT || 4000
server.start(PORT, () => console.log(`Server is running on http://localhost:4000`))