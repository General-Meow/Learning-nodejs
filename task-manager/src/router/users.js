const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()
const avatarsMulter = multer({
    // dest: 'avatars',  remove this to handle the saving of the files manually
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, callback) {
        if(!file.originalname.match(/.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please provide a file that is jpg, jpeg or png'))
        }

        return callback(undefined, true)
    }
})


router.post("/users", async (req, resp) => {
    const aNewUser = new User(req.body)
    try {
        const user = await aNewUser.save()
        const token = await user.generateAuthToken()
        // resp.status(201).send({ user: user.getPublicProfile(), token }) one way to remove the password and tokens properties from the response
        resp.status(201).send({ user, token })
    } catch (error) {
        resp.status(400).send(error)
    }
})

//run middleware function auth 
// router.get("/users", auth, async (req, resp) => {
//     try {
//         const users = await User.find({})
//         resp.status(200).send(users)
//     } catch (error) {
//         resp.status(400).send(error)
//     }
// })

router.get("/users/me", auth, async (req, resp) => {
    resp.send(req.user)
})

// no longer needed use /users/me   
// router.get('/users/:id', async (req, resp) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             return resp.status(400).send()
//         }
//         resp.status(200).send(user)
//     } catch (error) {
//         resp.status(500).send(error)
//     }
// })

router.post('/users/login', async (req, resp) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // return resp.send({ user: user.getPublicProfile(), token }) one way to remove the password and tokens properties from the response
        return resp.send({ user, token })
    } catch (e) {
        return resp.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, resp) => {
    try {
        req.user.tokens = req.user.tokens.filter((value) => value.token !== req.token)
        await req.user.save()
        resp.send()
    }
    catch (e) {
        resp.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, resp) => {
    try {
        req.user.tokens = []
        await req.user.save()
        resp.send()
    } catch (e) {
        resp.status(500).send(e)
    }
})

router.patch("/users/me", auth, async (req, resp) => {
    const payloadKeys = Object.keys(req.body)
    const allowedKeys = ['name', 'age', 'email', 'password']
    const validRequest = payloadKeys.every((key) => {
        return allowedKeys.includes(key)
    })

    if (!validRequest) {
        return resp.status(400).send("Error: cannot update as key not allowed")
    }

    try {
        const user = req.user
        payloadKeys.forEach((key) => {
            user[key] = req.body[key]
        })
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        resp.status(200).send(user)
    } catch (error) {
        resp.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, resp) => {
    try {
        await req.user.remove()
        resp.send(req.user)
    } catch (error) {
        resp.status(500).send(error)
    }
})

// manual way to store an image onto a mongo document
// router.post('/users/me/avatar', auth, avatarsMulter.single('avatar'), async (req, resp) => {
//     req.user.avatar = req.file.buffer
//     await req.user.save()
//     resp.send()
// }, (error, req, resp, next) => {
//     resp.status(400).send({error: error.message})
// })


router.post('/users/me/avatar', auth, avatarsMulter.single('avatar'), async (req, resp) => {
    const modifiedImage = await sharp(req.file.buffer)
    .png()
    .resize({
        width: 250,
        height: 250
    })
    .toBuffer()
        
    req.user.avatar = modifiedImage

    await req.user.save()
    resp.set('Content-Type', 'image/png')
    resp.send()
}, (error, req, resp, next) => {
    resp.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, resp) => {
    req.user.avatar = undefined
    await req.user.save()
    resp.send()
}, (error, req, resp, next) => {
    resp.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, resp) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            throw new Error("no image")
        }

        // resp.set('Content-Type', 'image/png')
        resp.send(user.avatar)
    } catch(error) {
        resp.status(404).send()
    }
})

module.exports = router