const { getUserId } = require('../utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const APP_SECRET = process.env.APP_SECRET

function upsertPost(parent, args, context, info) {
  const userId = getUserId(context)
  const upsertPost = context.prisma.post.upsert({
    where: {
      id: parseInt(args.postId)
    },
    update: {
      title: args.title,
      content: args.content,
    },
    create: {
      title: args.title,
      content: args.content,
      author: {
        connect: { id: parseInt(userId) },
      },
    },
  })

  return upsertPost
}


function deletePost(parent, args, context, info) {
  const deletePost = context.prisma.post.delete({

    where: {
      id: parseInt(args.postId),
    },
  })

  return deletePost
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

module.exports = {
  upsertPost,
  deletePost,

  signup,
  login,
}