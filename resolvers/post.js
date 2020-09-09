function author(parent, args, context) {
  return context.prisma.post.findOne({ where: { id: parent.id } }).author()
}

module.exports = {
  author,
}