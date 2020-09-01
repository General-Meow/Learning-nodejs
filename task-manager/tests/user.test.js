const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { db } = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: "bob",
    email: 'bob@hamburgers.com',
    password: 'qwertyuiop123!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('should sign up new user', async () => {

    await request(app).post('/users').send({
        name: 'paul',
        email: 'paul@exmaple.com',
        password: 'abc123!cvb'
    }).expect(201)
})

test('should login existing user', async () => {
    const result = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const savedUser = await User.findById(result.body.user._id)
    expect(savedUser.tokens[1].token).toBe(result.body.token)
})

test('should not login non existent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'fake password'
    }).expect(400)
})

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauth user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete account for user', async () => {
    const result = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const dbUser = await User.findById(userOneId)
    expect(dbUser).toBeNull()
})

test('should not delete account for unauth user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/sad-keanu-test.jpg')
        .expect(200)

    const dbUser = await User.findById(userOneId)
    expect(dbUser.avatar).not.toBeNull()
})

test('Should update valid user fields', async () => {
    const result = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'bobbie'
        })
        .expect(200)

    const dbUser = await User.findById(userOneId)
    expect(dbUser.name).toBe('bobbie')
})

test('Should not update invalid user details', async () => {
    const result = await request(app)
        .patch('/users/me')
        .send({
            name: 'bobbie'
        })
        .expect(401)

    const dbUser = await User.findById(userOneId)
    expect(dbUser.name).not.toBe('bobbie')
})
