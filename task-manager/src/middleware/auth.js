const jwt = require('jsonwebtoken')
const User = require('../models/user')

//middleware function defined and exported
const auth = async (req, resp, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const userObj = await jwt.verify(token, process.env.JWT_SECRET)

        //check if the id on that token matches to an existing user with the same token
        const foundUser = await User.findOne({ _id: userObj._id, "tokens.token": token})

        if(!foundUser) {
            return resp.status(401).send("No user found for token")
        }
        
        //add the user to the request so handler functions that need auth don't need to get the user again
        req.user = foundUser
        req.token = token
        next()
    } catch (e) {
        return resp.status(401).send("invalid authorization token provided")
    }
}

module.exports = auth