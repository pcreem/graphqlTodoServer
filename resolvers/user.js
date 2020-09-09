function posts(parent, args, context) {
  return context.prisma.user.findOne({ where: { id: parent.id } }).posts()
}

module.exports = {
  posts,
}