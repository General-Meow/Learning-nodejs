// const mongodb = require('mongodb')
// const ObjectID = mongodb.ObjectID
// const MongoClient = mongodb.MongoClient

// destructure the ObjectID and MongoClient from the object returned from require('mongo')
const { ObjectID, MongoClient } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
    connectionUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            user: 'root',
            password: 'example'
        }
    },
    (error, client) => {
        if (error) {
            return console.log("unable to connect to database")
        }

        const db = client.db(databaseName)

        //createDocuments(db, ObjectID)
        //queryDocuments(db, ObjectID)
        //updateDocuments(db, ObjectID)
        deleteDocuments(db, ObjectID)
    }
)

const createDocuments = function (db, ObjectID) {

    const guid = new ObjectID()
    db.collection('users').insertOne({
        _id: guid,
        name: 'Paul',
        age: 36
    }, (error, result) => {
        if (error) {
            return console.log("error while insertOne", error)
        }
        console.log(result.ops)
    })

    db.collection('users').insertMany(
        [
            { name: 'winki', age: 37 },
            { name: 'Jenson', age: 8 }
        ], (error, result) => {
            if (error) {
                return console.log(error)
            }
            console.log(result.ops)
        }
    )

    db.collection('tasks').insertMany(
        [
            { description: 'wash the dishes', completed: true },
            { description: 'brush your teeth', completed: true },
            { description: 'remove the squirrel', completed: false },
        ],
        (error, result) => {
            if (error) {
                return console.log(error)
            }
            console.log(result.ops)
        }
    )
}

const queryDocuments = function (db, ObjectID) {
    db.collection('users').findOne({ name: 'Paul' }, (error, user) => {
        if (error) {
            return console.log('error when searching for user')
        }

        console.log('found user:', user)
    })

    db.collection('tasks').findOne({ _id: new ObjectID("5f10bc0c3a22e661f2a1ecad") }, (error, task) => {
        if (error) {
            return console.log("error when searching for id", "5f10bc0c3a22e661f2a1ecad")
        }
        console.log("task found", task)
    })

    console.log("searching for all tasks")
    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            return console.log("error when searching for incomplete tasks")
        }
        console.log("all tasks found", tasks)
    })
}

const updateDocuments = function (db, ObjectID) {

    db.collection('users').updateOne(
        {
            _id: new ObjectID("5f10b5ac85ee0e606a5f0e77")
        },
        {
            $set: {
                name: 'paul'
            }
        }
    ).then((user) => {
        console.log('update happend', user)
    }).catch((error) => {
        console.log("error while updating user", error)
    });

    //update all tasks to be complete
    db.collection('tasks').updateMany(
        { completed: false },
        {
            $set: {
                completed: true
            }
        }
    ).then((result) => {
        console.log('update all tasks to complete', result)
    }).catch((error) => {
        console.log('error in updating tasks to complete')
    })
}

const deleteDocuments = function (db, ObjectID) {

    db.collection('tasks').deleteOne(
        { description: 'wash the dishes' }
    ).then((result) => {
        console.log("deleted task", result)
    }).catch((error) => {
        console.log('error in deleting tasks', error)
    })
}