const express = require('express')

const TaskModel = require("../models/task");
const { model } = require('../models/user');
const auth = require('../middleware/auth')

const router = new express.Router()

router.post("/tasks", auth, async (req, resp) => {
    const task = new TaskModel({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save()
        resp.status(201).send(task)
    } catch (error) {
        resp.status(400).send(error)
    }
})


//supports
// /task?completed=false
// /tasks?limit=5
// /tasks?skip=10

//sorting
// /tasks?sortBy=FIELD_asc/desc
// or
// /tasks?sortBy=FIELD:asc/desc
router.get('/tasks', auth, async (req, resp) => {
    try {
        // const tasks = await TaskModel.find({owner: req.user._id})

        //ALTERNATIVE APPROACH
        const match = {}
        //if no query param is provided, don't do any filtering and leave match object alone
        if (req.query.completed !== undefined){
            match.completed = req.query.completed === "true"
        }

        const sort = {}
        if(req.query.sortBy !== undefined) {
            const sortByParam = req.query.sortBy
            const sortByKey = sortByParam.split(":")[0]
            const sortByValue = sortByParam.split(":")[1]

            sort[sortByKey] = sortByValue === "asc" ? 1 : -1
        }
        console.log(sort)
        await req.user.populate({
            path: 'tasks',
            match,              // use the property shorthand and send the match property here
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }                 
        }).execPopulate()

        // don't do this, its not efficiant, make the db do it 
        // req.user.tasks = req.user.tasks.filter((task) => task.completed == completedParam)
        resp.status(200).send(req.user.tasks)
    } catch (error) {
        resp.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, resp) => {
    const _id = req.params.id
    try {
        const task = await TaskModel.findOne({ _id, owner: req.user._id })
        if (!task) {
            return resp.status(404).send()
        }
        resp.status(200).send(task)
    } catch (error) {
        resp.status(500).send(error)
    }
})

router.patch("/tasks/:id", auth, async (req, resp) => {
    const payloadKeys = Object.keys(req.body)
    const validKeys = ['description', 'completed']
    const validRequest = payloadKeys.every((key) => {
        return validKeys.includes(key)
    })

    if (!validRequest) {
        return resp.status(400).send("Error, contains invalid key")
    }

    try {
        const _id = req.params.id
        const task = await TaskModel.findOne({ _id, owner: req.user._id })
        if (!task) {
            resp.status(404).send()
        }
        payloadKeys.forEach((key) => {
            task[key] = req.body[key]
        })
        await task.save()
        resp.send(task)
    } catch (error) {
        resp.status(500).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, resp) => {
    try {
        const task = await TaskModel.findOne({ id: req.params.id, owner: req.user._id })
        if (!task) {
            return resp.status(404).send()
        }
        await task.remove()
        resp.send(task)
    } catch (error) {
        resp.status(500).send(error)
    }
})

module.exports = router