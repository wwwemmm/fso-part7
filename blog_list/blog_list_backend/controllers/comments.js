const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  //The functionality of the populate method of Mongoose is based on the fact that
  //we have defined "types" to the references in the Mongoose schema with the ref option:
  const comments = await Comment.find({}).populate('blog', { title: 1, author: 1, url: 1 })
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('comment request.body: ', body)
  const blog = await Blog.findById(body.blog)

  const comment = new Comment({
    content: body.content,
    blog: body.blog
  })
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = commentsRouter
