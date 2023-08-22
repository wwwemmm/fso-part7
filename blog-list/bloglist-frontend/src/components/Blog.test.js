import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders content', () => {
  const user = {
    'nousername':'root',
    'name':'Super User',
    'id':'64ddca53179fef78b5747fef'
  }
  const blog = {
    'title':'Blog list tests, step1',
    'author':'Full Stack Open',
    'url':'https://fullstackopen.com/en/part5',
    'likes':0,
    'user':{
      'username':'root',
      'name':'Super User',
      'id':'64ddca53179fef78b5747fef'
    }
  }
  const mockupdateBlog = jest.fn()
  const mockdeleteBlog = jest.fn()

  const { container } = render(<Blog blog={blog}
    updateBlog={mockupdateBlog}
    deleteBlog={mockdeleteBlog}
    user={user}
  />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Blog list tests, step1'
  )
  expect(div).toHaveTextContent(
    'Full Stack Open'
  )
  expect(div).not.toHaveTextContent(
    'https://fullstackopen.com/en/part5'
  )
  expect(div).not.toHaveTextContent(
    'likes'
  )
})

test('details will be shown affter clicking the controlling button', async() => {
  const user = {
    'username':'root',
    'name':'Super User',
    'id':'64ddca53179fef78b5747fef'
  }
  const blog = {
    'title':'Blog list tests, step1',
    'author':'Full Stack Open',
    'url':'https://fullstackopen.com/en/part5',
    'likes':0,
    'user':{
      'username':'root',
      'name':'Super User',
      'id':'64ddca53179fef78b5747fef'
    }
  }
  const mockupdateBlog = jest.fn()
  const mockdeleteBlog = jest.fn()

  const { container } = render(<Blog blog={blog}
    updateBlog={mockupdateBlog}
    deleteBlog={mockdeleteBlog}
    user={user}
  />)

  const mockuser = userEvent.setup()
  const button = screen.getByText('view')
  await mockuser.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Blog list tests, step1'
  )
  expect(div).toHaveTextContent(
    'Full Stack Open'
  )
  expect(div).toHaveTextContent(
    'https://fullstackopen.com/en/part5'
  )
  expect(div).toHaveTextContent(
    'likes'
  )
})

test('if the button is clicked twice, the event handler the componet received as props is called twice', async() => {
  const user = {
    'username':'root',
    'name':'Super User',
    'id':'64ddca53179fef78b5747fef'
  }
  const blog = {
    'title':'Blog list tests, step1',
    'author':'Full Stack Open',
    'url':'https://fullstackopen.com/en/part5',
    'likes':0,
    'user':{
      'username':'root',
      'name':'Super User',
      'id':'64ddca53179fef78b5747fef'
    }
  }
  const mockupdateBlog = jest.fn()
  const mockdeleteBlog = jest.fn()

  const { container } = render(<Blog blog={blog}
    updateBlog={mockupdateBlog}
    deleteBlog={mockdeleteBlog}
    user={user}
  />)

  const mockuser = userEvent.setup()
  const buttonView = screen.getByText('view')
  await mockuser.click(buttonView)

  const buttonLike =  screen.getByText('like')
  await mockuser.click(buttonLike)
  await mockuser.click(buttonLike)

  expect(mockupdateBlog.mock.calls).toHaveLength(2)
})

test('the BlogForm call the prons.function with correct details', async() => {
  const blog = {
    'title':'Blog list tests, step1',
    'author':'Full Stack Open',
    'url':'https://fullstackopen.com/en/part5',
    'likes':0,
    'user':{
      'username':'root',
      'name':'Super User',
      'id':'64ddca53179fef78b5747fef'
    }
  }
  const mockcreateBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={mockcreateBlog}
  />)

  const mockuser = userEvent.setup()
  const inputTitle = screen.getByPlaceholderText('write blog title here')
  const inputAuthor = screen.getByPlaceholderText('write blog author here')
  const inputUrl = screen.getByPlaceholderText('write blog url here')
  const buttonCreate = screen.getByText('create')

  //Don't foget await
  await mockuser.type(inputTitle, 'This is title')
  await mockuser.type(inputAuthor, 'This is author')
  await mockuser.type(inputUrl, 'This is url')

  await mockuser.click(buttonCreate)

  expect(mockcreateBlog.mock.calls).toHaveLength(1)
  //console.log('call content:', mockcreateBlog.mock.calls[0][0].title)
  expect(mockcreateBlog.mock.calls[0][0].title).toBe('This is title')
  expect(mockcreateBlog.mock.calls[0][0].author).toBe('This is author')
  expect(mockcreateBlog.mock.calls[0][0].url).toBe('This is url')
})
