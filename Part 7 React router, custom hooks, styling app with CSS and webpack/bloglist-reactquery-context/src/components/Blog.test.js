import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, not url and likes', async () => {
    const blog = {
        id: '63fdsakl123324de',
        title: 'kane is great player',
        author: 'sonny',
        url: 'kane.com',
        likes: 11,
        user: {
            username: 'conte',
            name: 'prudong',
        },
    }

    const { container } = render(<Blog blog={blog} />)

    const title = container.querySelector('#title')
    expect(title).toBeDefined()
    const author = container.querySelector('#author')
    expect(author).toBeDefined()
    const url = container.querySelector('#url')
    expect(url).toBeNull()
    const likes = container.querySelector('#likes')
    expect(likes).toBeNull()
})

test('click show button, then url and likes pop up!', async () => {
    const blog = {
        id: '63fdsakl123324de',
        title: 'kane is great player',
        author: 'sonny',
        url: 'kane.com',
        likes: 11,
        user: {
            username: 'conte',
            name: 'prudong',
        },
    }

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} toggleView={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = container.querySelector('#url')
    expect(url).toBeDefined()
    const likes = container.querySelector('#likes')
    expect(likes).toBeDefined()
})

test('like button clicked twice, then result is. .', async () => {
    const blog = {
        id: '63fdsakl123324de',
        title: 'kane is great player',
        author: 'sonny',
        url: 'kane.com',
        likes: 11,
        user: {
            username: 'conte',
            name: 'prudong',
        },
    }

    const mockHandler = jest.fn()
    const mockLikeHandler = jest.fn()

    render(
        <Blog
            blog={blog}
            toggleView={mockHandler}
            clickLike={mockLikeHandler}
        />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
