const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')

describe('Testing adding users:', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({
            username: 'root',
            passwordHash,
        })

        await user.save()
    })

    test('creating a new user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'cakehot',
            name: 'faker',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map((user) => user.username)
        expect(usernames).toContain(newUser.username)
    }, 10000)

    test('creating an invalid user (short username)', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ff',
            name: 'Cake',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            "username and password's length must be at least three"
        )

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map((user) => user.username)
        expect(usernames).not.toContain(newUser.username)
    }, 10000)

    test('creating an invalid user (short password)', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'cakeshow',
            name: 'fake',
            password: 'pa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            "username and password's length must be at least three"
        )

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map((user) => user.username)
        expect(usernames).not.toContain(newUser.username)
    }, 10000)

    test('creating an invalid user (username is missing)', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'pizza',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map((user) => user.username)
        expect(usernames).not.toContain(newUser.username)
    }, 10000)

    test('creating an invalid user (password is missing)', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'administrator',
            name: 'Yuri',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map((user) => user.username)
        expect(usernames).not.toContain(newUser.username)
    }, 10000)

    test('it would fail to add same username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'faker',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 10000)
})

afterAll(() => {
    mongoose.connection.close()
})
