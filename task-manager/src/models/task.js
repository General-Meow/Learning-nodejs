const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            required: true
        },
        completed: {
            type: Boolean,
            required: false,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }, {
    timestamps: true
}
)

const TaskModel = mongoose.model("Task", taskSchema)

// const aTask = new TaskModel({
//     description: "my first task",
//     completed: true
// })

// aTask.save().then((theTask) =>{
//     console.log("Saved a task!", theTask)
// }).catch((error) => {
//     console.log("Error!", error)
// })

module.exports = TaskModel