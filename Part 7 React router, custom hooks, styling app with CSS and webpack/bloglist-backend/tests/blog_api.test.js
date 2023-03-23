//help from
//https://github.com/YuriSpiridonov/fullstackopen/blob/main/part4/bloglist/tests/blog_api.test.js
//https://github.com/nullkaaryle/full-stack-open-2022-part-4
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let testToken = ''

beforeEach(async () => {
    await User.deleteMany({})

    await api.post('/api/users').send(helper.initialUsers[0])

    await api
        .post('/api/login')
        .send(helper.testLogin[0])
        .expect((response) => {
            testToken = response.body.token
        })

    await Blog.deleteMany({})

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${testToken}`)
        .send(helper.initialBlogs[0])

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${testToken}`)
        .send(helper.initialBlogs[1])
})

describe('Test: Get', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 10000)

    test('all blogs are returned', async () => {
        jest.setTimeout(30000)
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map((r) => r.title)
        expect(contents).toContain('T1')
    }, 10000)

    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    }, 10000)

    test('there is an id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToVerify = blogsAtStart[0]
        expect(blogToVerify.id).toBeDefined()
    })
}, 10000)

describe('Test: Post', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Damwon',
            author: 'showmaker',
            url: 'damwon.com',
            likes: 88,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${testToken}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map((n) => n.title)
        expect(titles).toContain('Damwon')
    }, 10000)

    test('likes default: 0', async () => {
        const newBlog = {
            title: 'coffee with Kimchi',
            author: 'Kim',
            url: 'coffeewithkimchi.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${testToken}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const likes = blogsAtEnd.map((n) => n.likes)
        expect(likes).toContain(0)
    }, 10000)

    test('blog without title or url: the status code 400 Bad Request.', async () => {
        const newBlog = {
            likes: 323,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${testToken}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
}, 10000)

describe('Test: Delete and Put', () => {
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${testToken}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map((r) => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    }, 10000)

    test('if Token is invalid, delete would fail', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[1]

        await api
            .post('/api/login')
            .send(helper.testLogin[1])
            .expect((response) => {
                testToken = response.body.token
            })

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${testToken}`)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const titles = blogsAtEnd.map((r) => r.title)

        expect(titles).toContain(blogToDelete.title)
    }, 10000)

    test('update a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            ...blogToUpdate,
            likes: 1111,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `bearer ${testToken}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const editedBlog = blogsAtEnd.find((b) => b.url === blogToUpdate.url)
        expect(editedBlog.likes).toBe(1111)
    })
}, 10000)

afterAll(() => {
    mongoose.connection.close()
})

/*
describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)
    expect(contents).toContain('T1')
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Damwon',
    author: 'showmaker',
    url: 'damwon.com',
    likes: 88,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((n) => n.title)
  expect(titles).toContain('Damwon')
}, 10000)

test('likes default: 0', async () => {
  const newBlog = {
    title: 'coffee with Kimchi',
    author: 'Kim',
    url: 'coffeewithkimchi.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map((n) => n.likes)
  expect(likes).toContain(0)
})

test('blog without title or url: the status code 400 Bad Request.', async () => {
  const newBlog = {
    likes: 323,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map((r) => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('there is an id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToVerify = blogsAtStart[0]
  expect(blogToVerify.id).toBeDefined()
})

test('update a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: 1111,
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const editedBlog = blogsAtEnd.find((b) => b.url === blogToUpdate.url)
  expect(editedBlog.likes).toBe(1111)
})
*/

/*
describe('Check ID definition:', () => {
  test('Is ID field defined as `id` insted of `_id`', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Testing GET reqest(s):', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('All blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('All blogs are containing info about creator', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Check if a blog posts without likes (zero likes) are exist', async () => {
    const blogs = await helper.blogsInDb()
    const likes = blogs.map(response => response.likes)
    expect(likes).toContain(0)
  })
})

describe('Testing POST request(s):', () => {
  let headers

  beforeEach(async () => {
    const user = {
      username: 'root',
      password: 'password',
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    headers = {
      'Authorization': `bearer ${loginUser.body.token}`
    }
  })

  test('Adding new entrie to DB', async () => {

    const newBlog = {
      title: 'Test blog entry',
      author: 'Yuri',
      url: 'localhost',
      likes: 350,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(response => response.title)
    expect(contents).toContain('Test blog entry')
  }, 10000)

  test('Adding new entrie to DB without auth token', async () => {

    const newBlog = {
      title: 'Test blog entry without token',
      author: 'Yuri',
      url: 'localhost',
      likes: 340,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  }, 10000)

  test('Adding new entrie WITOUT LIKES to DB', async () => {

    const newBlog = {
      title: 'Test blog entry2',
      author: 'Yuri',
      url: 'localhost',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(response => response.likes)

    expect(
      contents.reduce(
        (count, num) => (num === 0 ? count + 1: count), 0
      )
    ).toBe(2)

  }, 10000)

  test('POST request without title and url', async () => {

    const newBlog = {
      author: 'Yuri',
      likes: 350,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set(headers)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Testing POST request with wrong header:',  () => {
  test('Adding new entrie to DB with wrong headers', async () => {
    const newBlog = {
      title: 'Test blog entry by WrongUser',
      author: 'WrongAuthor',
      url: 'localhost:2002',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map(response => response.title)
    expect(contents).not.toContain('Test blog entry by WrongUser')
  }, 10000)
})

describe('Testing DELETE request(s):',  () => {
  let headers

  beforeEach(async () => {
    const user = {
      username: 'root',
      password: 'password',
    }

    const loginUser = await api
      .post('/api/login')
      .send(user)

    headers = {
      'Authorization': `bearer ${loginUser.body.token}`
    }
  })

  test('Deleting saved blog from DB', async () => {
    const currentBlogsInDb = await helper.blogsInDb()
    const blogToDelete = currentBlogsInDb[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set(headers)

    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAfterDelete.map(response => response.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

  test('Loggined user deleting saved blog from DB', async () => {
    const currentBlogsInDb = await helper.blogsInDb()
    const blogToDelete = currentBlogsInDb[0]


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set(headers)

    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAfterDelete.map(response => response.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

  test('Deleting nonexisting blog', async () => {
    const nonExistId = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${nonExistId}`)
      .expect(204)
      .set(headers)
  })
})

describe('Testing PUT request(s):', () => {
  test('Updating likes in post', async () => {
    const currentBlogsInDb = await helper.blogsInDb()
    const blogToUpdate = currentBlogsInDb[0]
    blogToUpdate.likes = 666

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAfterUpdate = await helper.blogsInDb()
    const contents = blogsAfterUpdate.map(response => response.likes)

    expect(contents).toContain(666)
  }, 10000)
})

describe ('Testing creator info:', () => {
  test ('creators id', async () => {
    const users = await User.find({})
    const id = users[0]._id

    const blogs = await helper.blogsInDb()
    const contents = blogs.map(response => response.user)
    expect(contents).toContainEqual(id)
  })
})
*/
