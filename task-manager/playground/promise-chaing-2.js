const mongoose = require('../src/db/mongoose')
const TaskModel = require('../src/models/task')

// TaskModel.findByIdAndDelete("5f13559f60f06c51578d1452").then(() => {
//     return TaskModel.find({
//         completed: false
//     })
// }).then((incompleteArr) => {
//     console.log("tasks left that are incomplete", incompleteArr.length)
// }).catch((error) => {
//     console.log(error)
// })

const deleteAndCountTask = async (_id) => {

    await TaskModel.deleteOne({_id})
    return await TaskModel.countDocuments({ "completed": false})
}

deleteAndCountTask("5f1357529d526954b02cef77").then((count => {
    console.log("Count", count)
})).catch((error) => {
    console.log(error)
})