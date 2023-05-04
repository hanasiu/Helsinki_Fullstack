import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const setRedMessage = jest.fn()
    const setGreenMessage = jest.fn()
    const user = userEvent.setup()

    render(
        <BlogForm
            createBlog={createBlog}
            setRedMessage={setRedMessage}
            setGreenMessage={setGreenMessage}
        />
    )

    const inputTitle = screen.getByPlaceholderText('write blog title here')
    const inputAuthor = screen.getByPlaceholderText('write blog author here')
    const inputUrl = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('create')

    await user.type(inputTitle, 'testing a form...')
    await user.type(inputAuthor, 'tester')
    await user.type(inputUrl, 'test.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('tester')
    expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})
