const { getUserId } = require('../utils')

function info(parent, args, context, info) {
  const userId = getUserId(context)
  const Posts = context.prisma.post.findMany({
    where: {
      authorId: parseInt(userId)
    }
  })

  return Posts
}


module.exports = {
  info
}