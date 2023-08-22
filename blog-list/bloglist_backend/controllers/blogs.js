const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
blogsRouter.get('/', async (request, response) => {
  //The functionality of the populate method of Mongoose is based on the fact that
  //we have defined "types" to the references in the Mongoose schema with the ref option:
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content:1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  //await console.log(user.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes|| 0,
    user : user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  //NB: blog.user is not string, but a object
  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'token don\'t have right to delete the blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const userid = body.user
  //console.log('blog.user.toString() :', blog.user.toString())
  //console.log('userid: ', userid)
  try {
    const newblog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes|| 0,
      user: userid }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true })
    response.json(updatedBlog)
  } catch(exception) {
    response.status(401).json('fail to updata')
  }
})

module.exports = blogsRouter
