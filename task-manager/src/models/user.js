const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            default: 0
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("email invalid")
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error("Password cannot be 'password'")
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
        avatar: {
            type: Buffer,
            required: false
        }
    }, {
        timestamps: true
    }
)

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('unable to log in')
    }

    return user;
}

userSchema.virtual('tasks', {
    ref: 'Task',  //The entity name to point to
    localField: '_id', //the local property name that is used as a foreign key on the other side of the relationship
    foreignField: 'owner' //the field name on the referred to entity to link to
}) 

userSchema.methods.getPublicProfile = function() {
    const user = this;
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    //we have a dedeicated endpoint for avatars so dont need to send it back for users
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//Hash the plain text password
userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password)
    }
    next()
})

//before deleting a user, lets delete the tasks
userSchema.pre('remove', async function(next) {
    const user = this

    await Task.deleteMany( {owner: user._id}) 

    next()
})

const User = mongoose.model('User', userSchema)



// const me = new User({
//     name: "Paul",
//     age: 36,
//     password: "abc123"
// })

// me.save()
//     .then(() => {
//         console.log(me)
//     }).catch((error) => {
//         console.log("error!", error)
//     })

// const winki = new User({
//     name: 'Winki',
//     email: "sdfsd@fssfds.com"
// })

// winki.save().then((value) => { console.log(value) }).catch((error) => { console.log('Error while saving winki', error)})


module.exports = User