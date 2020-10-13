## learning node

#### commands

- node -v : get version of node
- node <FILENAME.JS> : execute the file (script)
- npm -v : get version of npm
- npm init : initializes the project by creating configuration files (package.json)
- npm install <MODULE> : installs the module into your project / application in node_modules directory and a line in the package.json file and updates the package-lock.json
- npm install <MODULE>@<VERSION> : installs a specific version of a module
- npm install : using the package.json and package-lock.json, reinstall all the modules (dependencies) into the node_modules dir
- npm install -g <MODULE> : install a module globally (on the operating system), so you dont need to import it and allows you to use it in the terminal
- you should try and avoid installing global dependencies as it wont be managed in your package.json. if you can, install it as a dev dependency with `--save-dev`
  - the issue with this is that the dependency/tool wont be able to be used on the cli BUT you'll be able to use it in an npm script, this way it'll be versioned
- npm run <script command> : run a script defined in the package.json file
- nvm ... : change the version of node

#### modules

- validator : validates a number of things, emails, jwt, url's etc
- nodemon <FILENAME.JS> : wrapper tool around node used to restart node when files are changed, the FILENAME.js is a file it watches for changes
  - you can add the `-e` flag to the end with a comma seperated list of file extensions to look out for changes too e.g. `nodemon src/app.js -e js,hbs`
- yargs : helper module that parses command line arguments. makes arguments available via `yargs.argv`
  - also adds --help command line option to the app
  - also allows you to easily configure command line options for your app
- custom module : in order for the application to access anything in the custom module, you will need to export it
- path: a core node js that allows you to manipulate directory paths
  - `const path = require('path')`
  - `path.join('/x/y/z', '..')` join allows you to provide a path and manipulate it, so in this case the abs path is used then we go up a directory to the y directory, so `/x/y` is returned
- Handlebars: template engine that allows the creation of dynamic web pages
  - don't use handlebars directly when working on an express/node.js system
  - instead use `hbs` which uses handlebars but does the integration
  - install using `npm i hbs`
- install the mongodb driver using `npm i mongodb`
  - its the bare minimum module required to interact with mongo db
- another module you could used for mongo db is `mongoose` install with `npm i mongoose`
  - its a wrapper over mongodb module
  - provides other features such as
    - validation
    - data sanitization (cleaning)
    - model entities
- bcrypt.js is a module use to hashing passwords
  - `npm i bcryptjs`
- jsonwebtoken is a module that helps create and manage json web tokens (JWT)
  - `npm i jsonwebtoken`
- multer is an npm module that adds the ability to upload files to an express application
  - `npm i multer`
- sharp is a node.js module that allows you to process images - crop, resize and convert
  - `npm i sharp`
- SendGrid is a node.js module that allows you to send emails
  - you will need to create an account with them first at sendgrid.com for free tier
- env-cmd is a module that allows you to configure environments/properties
  - `npm i env-cmd --save-dev`
  - ensure to load it with the env config for any package.json scripts with `env-cmd -f ./path/dev.env ....`
- SuperTest
  - test library that helps testing http endpoints by providing functions to make http requests and assertions
  - created by the same people that made express
  - `npm i supertest`
- Socket.io
  - `npm i socket.io`

#### Typescript

- npm install -g typescript : install typescript globally to use its tools (`tsc` and `tsserver`). if you dont want to install it globally, you can run it from node_modules `./node_modules/.bin/tsc --init`
- npm install -D typescript : install typescript as a dev dependency to a node project
- npm install -D tslint : install linting
- npm install -D @types/<MODULE> : install the types of the module, usually do this after installing the module itself with `npm -i <MODULE>`
- tsconfig.json : ts configuration file containing compiler options, typically contains the following (it can also be generated using `tsc --init` https://www.typescriptlang.org/docs/handbook/compiler-options.html)

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

- a `src` directory with `*.ts` files need to be in there
- to compile you can use `tsc`
  - you can also use watch mode to recompile whenever theres a change `tsc -w`
- chai and mocha are unit test frameworks
- ts-node is an execution and REPL for typescript in node js

#### package.json

- ~<VERSION> : will allow for packages to be updated by patch version only e.g. ~1.1.1 will go to a max of 1.2.0
- ^<VERSION> : will allow for packages to be updates by minor version only e.g. ^1.1.1 will go to a maz of 2.0.0

- console and process are 2 global variables available to node applications. Process provides a lot of functionality like command line args
- browsers also have global variables such as window and document

- when installing node, you automatically install npm (node package manager too)
- to use modules from npm, you first need to initialize npm in the project, then install the modules
- look in npmjs.com to search for node modules to use. this is like maven central
- when installing modules, the package.json is updated to state the version thats installed
  - the package-lock.json file is also updated to lock the versions, where from and sha hash
  - the actual module is installed into the node_modules directory
  - you should not touch the lock or modules directory manually
- There are 3 types of modules.
  - core modules provided by the node platform
    - These modules are documented on the main site
    - Can be imported using the name (string) of the module, look at the documentation for the proper name and usage e.g. `require('fs')`
  - custom modules that you write
    - These modules are imported using a string that is a relative path to your file. e.g. `require('./custom.js')`
  - third party modules from npm
    - once installed these are imported into a file like a core module
- modules don't need to be assigned to a variable to be user, just using `require('...')` will load and execute the module. This can be don't for modules that need to connect to DB's etc but don't export anything

```javascript
const fs = require('fs') //core module
const custom = require('./my-custom.fs') //a custom module
const validator = require('validator') //a third party module install via npm

fs.writeFileSync('myFile.json', 'string content')....
const dataBuffer = fs.readFileSync('myFile.json')
custom.customerfunction(...)

validator...
```

- process.argv contains an array of command line arguments

```javascript
console.log(process.argv);
```

#### Saving data

- to convert an object to a string use `JSON.stringify(object)`
- to convert a json string into an object use `JSON.parse(string)`

#### Debugging

- There are a number of ways to debug applications
  - using `console.log()`
  - using `debugger` keyword that works with chrome, you'll need to add the `inspect` option to the node command to enable it `node inspect app.js ...`
    - this will pause the app at the point where `debugger` is written
    - to then attach to the app, in chrome, goto: `chrome://inspect` then select the correct target
    - when using this method, don't forget to add the workspace in the inspect work panel to get the source in the browser
    - if you play through the debugger and want to run it again, just run the command `restart` in the terminal, this creates a new remote target to inspect

#### Node internals

- Just like Java, node.js applications have call stacks that stacks function calls
- remember that anonymous functions will be placed on the stack too

#### Misc

- A simple node module called `request` can be used to make http requests
  - it takes an config object for the request
  - also takes a callback function that runs after the request is made
  - callback function has an error object as a first param and response as second
  - network related errors will populate the error obj
  - server/client or 500x/400x lvl errors will not populate error obj but rather the response obj
- You don't need to use the `request` module to do http, you can use the ootb HTTP and HTTPS modules from node
  - `const https = require('https')`

```javascript
const request = require("request");

request({ url: "the url", json: true }, (error, response) => {
  console.log(resonse.body);
});
```

- creating your own functions with callbacks is easy, remember, in JS functions are a first class citizen, meaning they can be passed around just like variables/objects
  - you define a function with a callback just like a function with variables, the arguments can be functions
  - within your function, you just trigger your argument function with brackets

```javascript
const myFunctionWithCallback = function (aVariable, callbackFunc) {};

myFunctionWithCallback(10, (result) => {
  console.log("the result from the function call is: " + result);
});
```

#### Web server

- express is the go to web framework
- install express with `npm install express`
- import the express function with `const express = require('express')`
  - create an express obj with `const app = express()`
  - this object can be called with various methods to setup routes and related functions
  - e.g. `app.get('', (req, res) => { res.send('hello')})` this maps a function to the root and returns "hello" as a response
  - you can get many things off the `req` object
    - path parameters come from the `req.params` object
    - payloads come from `req.body`
    - request method used from `req.method`
    - the path requested from `req.path`
  - the `send` function will automatically encode the string to html if its html (so tags won't be shown in the browser as plain text)
  - the `send` function can also take json objects to respond with json
  - You can only use `send` once per route, more than once will result in multiple headers error, so ensure you only send a repsonse once
  - to start express with the configured routes `app.listen(3000)` to listen on port 3000
  - you can also provide a callback function to listen that will run when the server starts
  - express initializes a number of variables, they are:
    - `__dirname`: which provides the absolute path of the current script
    - `__filename`: provides the file name with the absolute path
  - express allows you to respond with an entire directory if you wish
    - to do this, you will need to provide express with the absolute path of the directory
  - you can configure an endpoint to handle errors that are thrown by providing another function after the request handler function with the params `error`, `req`, `resp`, `next`. here you can set the http status.
    - app.get('/endpoint', (req, resp) => {}, (error, req, resp, next) => {...})
- To customise express, you can use the `app.use()` method.
  - it does many things, but one thing it can do is setup a directory to serve static files from `app.use(express.static('/full path'))`
  - you can automatically convert inbound json payloads into objects by using `app.use(express.json())`. The object will then be on `req.body` for express resources
- Handlebars
  - once installed, you need to config express to use it with `app.set('view engine', 'hbs')`
    - the `set()` method sets configuration for express
    - you do this straight after creating the app and before confiing any paths
  - hbs expects things to be in certain locations
    - so the templates need to live in a directory called `views` in the root of the project
  - view templates have the `.hbs` extension
  - to return a dynamic template, you need to have a route that returns a rendered template, you use `res.render('<template_name>')` to do that
  - use `render()` second arg to provide an object with properties for the template to render `res.render('index', {title: 'my index'})`
  - you get access to the object attributes in the dynamic template by using the handlebars syntax `{{attribute}}`
  - handlebar partials give you the ability to create components that you can share between pages, a good use case would be headers and footers
    - you'll need to import the hbs module to do this `const hbs = require('hbs')`
    - you should have the paritials separate from the view templates
    - partials have an `.hbs` extension
    - they are not a full page, so no need the while `<html>` tag just the component content
    - to use a partial, use the syntax `{{>partial_name_with_no_ext}}`
  - if you want to change the directory where the dynamic templates are stored, you set the `views` property `apps.set('views', DIRECTORY_STRING)` (you can use the path.join and \_\_dirname)
  - to look at the properties that are avaliable to change for express, look at the documentation for the `set` function on `app`
  - to create links between pages, just use the `a href` to point to the mapping
- Generic error pages
  - express support wild card paths with `*`, these need to be placed after all the other routes
  - this works because page matching works top to bottom, matching on static files, the configured routes then the last, catch all wildcard
  - you can use wildcard within a route, so `/help/*` will match on any page prepended with `/help`
  - request params can be accessed via the `request.query` object

```javascript
app.get("reoute...", (req, res) => {
  console.log(req.query); //prints out all query params as a json obj
});
```

- Without middleware, once a request is made, the correct route handler is found and executed
  - middleware allows us to inject behaviour before the execution of the route handler
  - middleware is just a function that run before or after something
    - its a function that takes a req, resp and next
  - one example of using middleware would be to wrap the handler in JWT validation
  - middleware functions MUST BE defined before all other `app.use()` invokations
    - middleware defined this way will execute for ALL routes
    - if you want to run middleware for specific routes, then you don't invoke `use` but pass that function as the 2nd argument to the route call `route.get('path', middlewareFunction, (req, resp) => {})
  - the middleware function can choose to continue and execute the handler function or not
  - to define middleware, you use the express `use(...)` function with another function
    - this function has 3 arguments `req, resp, next`
    - you need to call `next` to indicate that the route handler can execute
  - if you want the middleware to reject the request and not call the handler, you just invoke the `send()` function on the response argument `resp.send('cannot call this endpoint')`
  - during the middleware function call, you can add properties to the `req` object so that the handler function could access them
    - an example of this usage is to add the found user during authentication to the req obj so that the handler function doesn't need to do another db call

```javascript
const app = express()

app.use((req, resp, next) => {
  ...
  next()
})

```

#### Heroku

- `heroku keys:add` : add and upload ssh keys
- `heroku apps:create <project_name>` : create a new app project in heroku, this returns a url for the app and a repo location. If you run this in your git proj dir, it also adds a remote repo with the url

- You need to have a `start` script in your package.json in order for heroku to run the app
- `start` needs to have the run command, something like `node src/app.js`
- heroku runs your app on a dynamic port, this means that if your app binds to a specific port, you need to make a change to use the dynamic port which is set as an environment variable

```javascript
const port = process.env.PORT || 3000; //PORT is what heroku sets, if this is not set (like when running locally), then use port 3000 by default

app.listen(port, () => {
  console.log("app now running on port", port);
});
```

- any requests made in JS that call a local service should not use an absolute path but a relative one

#### Mongodb

- runs on 27021
- `db.version()` returns the version of the db server
- install the driver with `npm i mongodb`
- to use mongo, you need to import it with `const mongodb = require('mongodb')`
- get a client instance with `const MongoClient = mongodb.MongoClient`
- create a connection with the db url, options and callback `MongoClient.connect(ur, {}, (error, client) => {})`
- run the db code in the call back
- the call back has an error obj as the first arg and a client obj to do stuff as the second
- to do db operations, use the client to get/create a database which would then be used to get/create collections
- make sure you use the mongo db driver api to lookup the methods documentation http://mongodb.github.io/node-mongodb-native/3.5/api

```javascript
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const dbUrl = "mongodb://127.0.0.1:27017";
MongoClient.connect(dbUrl, {}, (error, client) => {
  const db = client.db("database-name");
  db.collection("users").insertOne({
    x: "y",
  });
});
```

- `inserOne()` is a method on a collection that inserts 1 document
  - it also takes a callback of error and result
  - the result holds the result and id of the new document
  - also holds the ops property which is the document that was inserted
- id's are guids
  - are automatically saved into the `_id` property of documents
  - stored as a 12 bit binary to save space. if it was a string (hexString) it'll be 24 bytes
  - generated by mongo and is unique
  - `ObjectID` from the mongo object returned from `require('mongo')` is a constructor function that can generate guids use: `const guid = new Object()`
  - returns an `ObjectId` type
  - you could use deconstruction on it to get the properties
  - guid is actually constructed of multiple bits of info
    - 12 bytes
    - 4 bytes of timestamp from unix epoc
    - 5 byte random
    - 3 byte counter starting from random

```javascript
const { ObjectID } = require("mongo");
const guid = new ObjectID();
console.log("Generated guid:", guid);
console.log(guid.timestamp());
```

- Querying

  - You can use various find methods on the `Collection` type to query a collection for documents
  - the `findOne` method takes an object that represents what your looking for and an optional second object with options, the last arg is a callback of error and result
  - use the`find` function to search for multiple documents
    - when using find, it wont return a value document but rather a `cursor`
    - like a java `iterator` a `cursor` isn't the actual data but a pointer, you can get things like the count of the results etc
    - The cursor has a `toArray` function takes a callback of error and an array of results
    - e.g. `find({age: 20}).toArray((error, users) => { console.log(users)})
  - searching by ObjectID needs to happen by providing an object with the `_id` property pointing to an actual objectId e.g. `.find({ _id: new ObjectID("xxx")})`

- Updating

  - use methods `updateOne` and `updateMany`. `update` is now deprecated so don't use
  - these methods return a `Promise` (if you don't provide a callback) so make sure you use the `then` and `catch` methods to handle the result/error
  - the first arg to these method is the search critera object, then another object that contains update operators
    - `{ $set: { name: 'paul' } }` : this sets the name field to 'paul'
    - other operators include, search for `mongo db operators` for more
      - \$min
      - \$max
      - \$rename
      - \$mul
      - \$inc
  - the resolve promise returns an object but most of the properties aren't that interesting, the ones that are, are mostly modifiedCount and matchCount

  - Deletions
    - use `deleteMany` and `deleteOne`. `delete` is now deprecated
    - just like findOne, its finds a document using the first arg as a criteria and then deletes them
    - also returns a promise
    - the revolved argument has a `deletedCount`

- Mongoose
  - just like mongo db driver but provides many more features
  - `const mongoose = require('mongoose')`
  - connections are slightly different, you provide the username and password in the connection string AND you need to state where the user is in the db `mongoose.connect('mongodb://root:example@127.0.0.1:27017/task-manager-api?authSource=admin', ...)`
  - You can create entity models using the `mongoose.model(...)` function
  - model objects have a number of functions on them, `save()` being one of them

```javascript
const mongoose = require("mongoose");

const dbUrl = "mongodb://username:password@ip:port/db-name"; //note the difference in url
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(dbUrl, options);

//define the schema of the user
const userSchema = {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
};
//can also be defined using the new operator
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String
//   },
//   age: {
//     type: Number
//   }
// })

//create a model constructor function using the models schema
const UserModel = mongoose.model("User", userSchema);

const me = new UserModel({
  name: "Paul",
  age: 30,
});

//save the model to the collection User
//returns a promise
me.save()
  .then((savedMe) => {
    console.log(savedMe);
  })
  .catch((error) => {
    console.log(error);
  });

//or wait and unwrap the promise if your in an async function
const savedMe = await me.save();
```

- The second object to the `.model(...)` method is automatically converted to a schema
- The schemas properties can be of many types
  - String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map
  - to use `ObjectId` type, you need to refer to it via `mongoose.Schema.Types.ObjectId`
  - if you use `ObjectId` as a type, you can further link documents together in a relationship type way by using the property `ref` with the string value of the related Schema name
  - `ref` allows you to link two documents together and effectively do a lookup on that related entity and convert the property on THIS entity to that
- validation and sanitization can be done by defining the rules in the model
  - the following are some of the mongoose supported attributes for Schemas
  - `required` for all types
  - `unique` creates an index on the field and only allows one document to have that value
  - `default`
  - `min`/`max` for numbers
  - `enum`,`match`, `minlength`, `maxlength` for strings
  - `ref`
  - custom validation using `validate(value)` function
- if you are doing any complex validation, its recommended to use a validation library e.g. `validator` and it can be installed using `npm i validator`

```javascript
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18, //adults only
    max: 120,
  },
  email: {
    type: String,
    validate(value) {
      var index = value.indexOf("@") > 1;
      if (index < 0) {
        throw new Error("Email validation failed");
      }

      //or use validator
      if (!validator.isEmail(value)) {
        throw new Error("Email validation failed");
      }
    },
  },
  //define tokens as an array of objects
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
```

```javascript
//entity type relationships

const Task = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Type.ObjectId,
    required: true,
    ref: "User",
  },
});

///////

const task = Task.findById("xxxx");
console.log(task.owner); //this will print out the ObjectId
await task.populate("owner").execPopulate();
console.log(task.owner); //now the owner property has been converted to the owner entity
```

- The `populate(...)` method that pulls related documents can also be customised to filter those documents by instead of providing the string name of the property, provide an object with the string name as the `path` property and a match object that looks for documents that match
- Doing this allows you to filter at tha DB rather than retrieving all the data first the filtering it at the application level,
- You can also do sorting and pagination by providing an `options` property object
  - `limit` and `skip` allow you to limit the results as well as define how many records to skip, effectively giving you pagination
- Sorting can be done by providing a `sort` property object in the `options` object
  - the object will contain the property to sort by as well as a `1` as the value for ascending and `-1` value for descending

```javascript

const tasks = user.populate({
  path: "tasks",
  match: {          //return tasks that match this object
    completed: true
  },
  options: {
    limit: 2,
    skip: 4, //view page 5
    sort: {
      createdAt: -1 // sort on the createdAt field by descending
    }
  }
}).execPopulate()

```

- Mongoose schema objects (model instances) also contain properties called `virtuals`, these are like transient properties that dont get persisted to the db
- Virtuals are great for funcitons that do a little processing on properties before returning them - think of a function like `fullName()`
- model instances have a `toObject()` method that returns a plain javascript object
- if you provide a toJSON method on the model schema `methods` property, Express will call it before via the `JSON.stringify()` method writing the result to the response as a string
- You can add `virtuals` to an entity that will do a fetch on related documents via its schema `<ENTITY_SCHEMA>.virtual('<PROPERTY_NAME>, { ref: <ENTITY_REFEERRING_TO_NAME>}')`
- With the above defined, you again use the `await ENTITY.populate('<PROPERTY>').execPopulate()` which will do the fetch

```javascript

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}
...

resp.send(user)
```

- When defining a schema, you can also send an options object. This object can be configured to make the Model save createdAt/updatedAt properties with timestamps by providing a `timestamps` property with true

```javascript
const userSchema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: true
    }
  },
  {
    timestamps: true,
  }
);
```

- Querying data
  - there are a number functions on the defined models to find data (some are:)
  - `find({CRITERIA})` return a list of models matching criteria
  - `findById(ID)` : by an entity by id, does not need an ObjectID type like the raw mongodb module as it automatically converts a string to an ObjectID
- route params are dynamic parts of a url (not the query params)
  - you can define one on a route with the following syntax `app.get('/users/:PARAM_NAME')`
  - you can then get access to this route parameter via the `req` object `req.params.PARAM_NAME`

```javascript
app.get("/tasks", (req, resp) => {
  TaskModel.find({})
    .then((values) => {
      resp.status(200).send(values);
    })
    .catch((error) => {
      resp.status(500).send(error);
    });
});

app.get("/tasks/:id", (req, resp) => {
  TaskModel.findById(req.params.id)
    .then((value) => {
      if (!value) {
        return resp.status(404).send();
      }
      resp.status(200).send(value);
    })
    .catch((error) => {
      resp.status(500).send(error);
    });
});
```

- Updating documents

  - mongoose makes it easier too by not requiring the developer to use mongodb operators such as `$set`, the object defining the update just needs to old the changes without operators
  - you can use the methods
    - `findByIdAndUpdate`: takes an id, object of updates and an options object, its worth noting that this bypasses mongoose and does not run validation, which is why its needed to provide options containing `runValidators`
      - if you want middleware to run, dont use this function but rather find the model by id, make the update, then save
    - `findOneAndUpdate`
    - `updateOne`
  - The options object
    - can have the property `new` which will return the fresh version of the entity back as a return object
    - can have the property `runValidators` (boolean) to validate the object against the schema
  - the updates can throw exceptions, which means the `catch` in `try catch` will need to check for validation failures and send the correct http response

- Deleting
  - `deleteOne`, `deleteMany`, `findByIdAndDelete`, `findOneAndDelete` are the many ways to delete documents
- Middleware
  - Mongoose supports middleware, which allows you to customise the defined models
  - so running function during some lifetime hooks is possible
  - one example of its usage would be to hash passwords before saving them
  - to use middleware, you first need to create a schema object.
  - with the access to the schema object, you can call methods
    - `pre`: run a function before save
    - `post` : run a function after save
  - `pre('save', function (next) => {})`
    - you must not provide an arrow function as a second param as `this` is bounded the the object you are saving
    - next is used to indicate that the function is finished, this is required because the as the function can be async and will run when the main thread is blocked/paused, it also indicates to mongoose that it can now save the model

```javascript
const userSchema = new mongoose.Schema("User");
userSchema.pre("save", async function (next) {
  //this is a user model object, sometimes you want to bind this to something more meaningful
  const user = this;

  console.log("before saving:", user);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  //next is a function that you call when your done.
  next();
});
```

- Customising Mongoose
  - you get quite a few queries with mongoose but what if you want to define your own?
  - you add your own methods against the `statics` property on the `schema` object

```javascript
//send plain text password
userSchema.statics.findByEmailAndPassword = async (email, password) => {
  const user = User.findByOne({ email }); //use object constructing shortcut to create {email: email}
  if (!user) {
    throw new Error("no user found");
  }
  //does the password encrypt to the same value in the db
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("no user found");
  }
  return user;
};
```

- As well as queries that can be added, you can add method functions to the Model types
  - this is done by adding methods to the `methods` property on the schema
  - when defining a function, don't use the arrow function as you will need to bind `this` to the instance object

```javascript
const jwt = require('jsonwebtoken')

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, 'thisismysecret')
}

...
router.post('/users/login', async (req, resp) => {
  const user = await User.findByEmailAndPassword(req.body.email, req.body.password)

  if(!user) {
    resp.status(400).send('no user')
  }
  const token = user.generateAuthToken()
  //use the method on the user model
  resp.send({ user, token})
})
```

- Routing

  - You can break out routes into smaller files
  - usually you break them by resources (entities)
  - requires a new `router`
    - `const router = new express.Router()`
    - the router has the same HTTP methods on it like `app`
    - to enable the new router, we pass it to the app via the `use` method `app.use(router`
    - typically have all the router files under the `router` folder
    -

- Uploading files
  - multer is a module that allows you to upload files
  - name comes from the `multiform` name
  - you would normally import (require) this module multiple times with different options (for things like accepted file types)
  - The options you would normally instantiate with are
    - `dest` the location on the FS of where the files get copied to
    - `limits` is an object with a property `fileSize` 1 million is 1 megabyte
    - `fileFilter` is function with 3 args, `req`, `file`, `callback` that will filter out the uploaded file
      - if its acceptable, you call the callback with null and true otherwise null and false
      - if an error occurs you call the callback with a new error object
  - To make it work, multer provides middleware that you apply to endpoints
    - just like the auth middleware, you call the function `multer.single(<FIELD_NAME_FROM_REQUEST>)` as the second argument 
    - once a request is made, any request with the field name provided will have its file copied into the `dest` directory, then the rest of the method is executed
    - by default, the file is uploaded with a uuid filename and no file extension
  - Has support to validate uploads by limiting what files can be uploaded by extension type
    - also limits on file sizes is possible
  - If you want errors from the filter to show up as JSON, provide an error handler in the express endpoint
  - most of the time, you would want to store uploaded files into a DB rather on a disk on your server
    - to do this, you add a property on your mongoose model with the type `Buffer`
    - change `multer` from handling the saving/persisting of the upload so that its exposes it to you rather than doing it automatically
      - this is done by removing the `dest` property in the options while setting up multer (forcing you to manually handle it)
      - the `req` object in the handler will now have a property `file` which has a `buffer` property
  - you can have an express endpoint that returns binary/buffer data, express automatically sets the content type but you can manually set the content type
    - `resp.set('Content-Type', 'image/jpg')` 

```javascript
const multer = require('multer')

const upload = multer({
  dest: "images",    //the images directory where the files get copied to
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
     if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please provide a file that is jpg, jpeg or png'))
        }

        return callback(undefined, true)
    }
  }
})

app.post('/uploadImage', multer.single('avatar'), (req, resp) => {
  resp.send()
}, (error, reqm resp, next) => {
  resp.status(400).send({error}) //use the variable shorthand
})
```

```javascript
const UserModel = new mongoose.Schema({
  avatar: {
    type: Buffer,
    required: false
  }
})


const multer = require('multer')

//note that there is no dest property so we need to save manually
const manualUpload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
     if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please provide a file that is jpg, jpeg or png'))
        }
        return callback(undefined, true)
    }
  }
})

app.post('/uploadImage', auth, multer.single('avatar'), async (req, resp) => {
  //the file is now available on the request object
  req.user.avatar = req.file.buffer
  await req.user.save()
  resp.send()
}, (error, reqm resp, next) => {
  resp.status(400).send({error}) //use the variable shorthand
})
```


- JWT
  - can use the module `jsonwebtoken`
  - usage is `const jwt = require('jsonwebtoken')`
  - `jwt.sign(PAYLOAD_TO_ENCODE_USUALLY_CONTAINS_USER_DATA, SECRET)`
  - this method can also take an optional 3rd param of options, this can define as well as other things the `expiresIn` string format
  - JWT's are formed of 3 parts separated by fullstops
  - each part if base 64 encoded
  - 1st part is known as the header, contains meta data describing what the type of token and algo was used
  - 2nd is the payload/body which contains the data we provided
  - 3rd is the signature used to verify the token
  - the point of JWT's is to ensure that the data sent to the server is correct as third parties wont be able to change the payload as they don't know the secret
  - `jwt.verify(token, 'secret')` is used to verify a token against a secret.
    - if will throw an exception when the token cannot be verified with the secret
    - will also throw an exception if the token has expired
  - JWT's should be sent with each request as a header
    - the header is `Authorization` and the value is `Bearer TOKEN` where TOKEN is the JWT

#### Advanced Postman

- request urls can be made to reference environment variables so that you don't need to keep changing the url
- to create environment variables, you first need to create an environment, this is done in the cog icon menu
  - add
  - define the environment name
  - define the environment variables and its initial value
- create multiple environments (dev/stage/prod) then select the environment from the main screens drop down
- to use an environment menu, you use the syntax `{{ variable_name }}` in places like the url
- instead of manually changing the url, just use env vars to flip the environment
- You can use bearer tokens in a number of ways
  - insert the JWT as an authorization header for each request
  - use the Authorisation tab, this doesn't require you to out the `Bearer` bit in manually
  - inherit the token from the collection
    - this is just like using the Authorization tab but provides it to the Collection as a whole so that all requests in the collection can inherit
    - You can even use env vars here
- Its also possible to write code that takes response values and set env vars up, this helps as you don't need to manually update env vars based on things like tokens from logins so that subsiquent requests use the correct token
- `Pre-request script` and `Tests` allow you to run javascript before and after requests get executed, this is where you can work your magic
- The following is a `Tests` script that runs on the login request

```javascript
if (pm.response.code === 200) {
  //postman provides us with the pm object
  pm.environment.set("authToken", pm.response.json().token); //set the env var 'authToken' to the responses token property you can see it as the "current value"
}
```

#### Environments

- You can set up environment variables in a node js app just like in springboot using a module called `env-cmd`
- use it in any package.json scripts `env-cmd -f ./path/dev.env
- the dev.env file is formatted as key value pairs e.g. `envar=abc`
- to use the environment variables, use the `process.env.ENV_VAR_NAME`

#### Testing

- Testing frameworks should be installed as a dev dependency `npm install MODULE_NAME --save-dev` as they only run locally
- Jest is one of the popular testing frameworks - https://jestjs.io
  - one of the more modern testing frameworks
  - is zero config testing framework to get started but obviously can be configured if needed
  - to execute tests, just run `jest`, you can also map it to a `test` script in the `package.json` file
    - you can tweak the script slightly to run jest like nodemon with `jest --watch`
  - files in a `__test__` directory or files with `spec`/`test` are picked up and executed as tests
  - Jest injects a global function `test()` in your test suite files, its also injects other globals
  - The shape of a test is to use the test function with a string and a function as arugements `test('test description', () => {})`
  - To validate the result of a function, you can use the `expect` global function with the `toBe(..)` method e.g. `expect(result).toBe(expectedResult)`
    - check the jest documentation on the expect methods available
    - `.toBeNull(..)`
    - some expects can be reversed by putting `.not.toBe...()` before it
    - `toBe` - under the hood this uses the js `===` so you can't compare `{}` to `{}` as that will fail (because it must be the exact same object)
    - if you want to check equality on `{}` you can use `toEqual`
    - expecting on types can also be done e.g. `expect(thing).toEqual(expect.any(TYPE_CONSTRUCTOR))` where type can be `String`, `Buffer` etc
      - `expect(user.avatar).toEqual(expect.any(Buffer))`
  - testing async code can also be done with jest
    - the 2nd arg (the function) of the test function can also take a parameter. this parameter is a callback function and is used for testing async code
    - you call this callback function (typically called `done`) after the async method is complete

```javascript
test('testing async code', (done) => {
    setTimeout(() => {
        expect(1).toBe(2)
        done()
    }, 2000)
})
```

  - async code can also be tested another way for promises and async/await
    - mark the second parameter as async and ensure you DON'T provide the done argument
    - within the test method, you can now use the `await` keyword against any method that returns a `Promise`
    - use `expect` like normal on the awaited result
  - Jest has life cycle hooks as global functions
    - setup - `beforeEach` and `beforeAll`
    - teardown - `afterEach` and `afterAll`

```javascript
beforeEach(() => {
  console.log('this runs before each test')
})

afterEach(() => {
  console.log('this runs after each test')
})
```

  - Configuration of Jest is placed in the `package.json` as a root property object called jest
    - config options are in the documentation

```javascript
"jest": {
  "testEnvironment": "node"
}
```

- MockaJs is another testing framework
- SuperTest is a test library made by the same guys that made express.
  - used to make http requests and make assertions
  - doesn't actually need the app to be running to test its, it only needs it to be defined
    - this is actually a problem as we normally define the express app and start it in the same file
  - you will need to load the app and provide it to the request function
  - once you loaded the request function, you have the http request methods to call with the endpoints
  - you can send payloads with the `send()` method
  - expects are then available
  - the assertions/expects that you can use:
    - expect(HTTP_CODE)
    - 

```javascript
const request = require('supertest')
const app = require('app')

test('make request to endpoint', async () => {
  await request(app).get()
    .expect(200)

  //you can also place the response in a variable for further expects
  const response = await request(app).get().expect(200)
})
```

- ways of testing
  - you can directly check the database for changes
    - `const dbValue = await User.findById(response.body.user._id)`
  - assert the response from the http endpoint
    - `expect(response.body.user.email).toBe("bob@example.com")`
    - ```
    //the object must at least have the same properties provided  but can have more
    expect(response.body).toMatchObject({
      user: {
        name: "bob",
        email: "bob@example.com"
      }
    })
    ```

- Mocking
  - When doing something like integration testing, you don't want to be communicating directly with third parties e.g. sending emails, consuming credits etc
  - Mocking allows you to swap out these integrations/third party code with your own code so that you don't communicate with the third party
  - Jest allows you to mock out code if you include a `__mocks__` directory
  - if you mock code, you create files in the __mocks__ directory that match the npm module name used in `require(...)`
  - if you want to mock a scoped npm module (modules with a slash in it) then you simply create a folder in __mocks__ with the name before the slash, then a file with the name after the slash
    - e.g. `@sendmail/mail` will have @sendmail as a folder and `mail.js` as a file
    - when mocking, you will need to mock out the functions that your using otherwise it wont work

  #### Websockets

- Web sockets is a separate protocol from HTTP
- It allows for full duplex communications which basically means bi directional, from client to server and server to client
- Clients hold a persistent connection to a server which allows the server to send back data without the client initiating it
- socket.io is one of the welknown node modules to supports websockets
- requires support on the server AND the client
- when using socket.io, with automatically sets up an endpoint for clients to access that allows them to download (via http) a js library file that allows them to communicate via websockets (usually served at `/socker.io/socker.io.js`)
- the js library exposes several functions, one of which is `io()` that connects to the server and the returned object allows you to send and receive events
- You'll need to create another js file that will use these functions to communicate with the io server
- socket.io and express can work together but a basic express app needs to be configured slightly differently
  - a basic express app by default uses the http core module and creates a http server
  - you'll need to do this manually for socket.io support and provide the express app to it
  - with the manually created http server, you then initialize socket.io with the server by calling the function with it
  - instead of running `listen` on an express app, you run it on the http server
  - with an instance of socket.io, you can now listen to certain events and register callbacks then they occur
  - the callback is called with an argument `socket` which is an object that contains information on the connected client
  - when communicating with clients/server you send messages called `events` and you do so by `emitting` them
  - the socket object has an `emit` function which is used to send and `event` to the singleclient
    - when you emit an event, at minimum, you will emit it with the name/type of event as a string along with the data
    - the client will need to use the object from `io()` to listen to events using the `on(..)` method and 2 arguments, the event name/type and a callback to run on that event
    - generally, you put all your code that emit messages within the `io.on('connection...)` function
    - `io.on('connection')` is used when a client connects
    - if you want to use a client disconnect event, you don't use `io.on()` but rather use `socket.on('disconnect')` from within the function provided to the `connection` event

```javascript
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

//create express app
const app = express()
//create http server with the express app
const httpServer = http.createServer(app)
//create and init socker.io with the server
const io = socketio(httpServer)

io.on('connection', (socket) => {
  console.log('a ws connection was made')
})

//start up the server
httpServer.listen(3000, () => {console.log('server started')})
```

and in the client (browser)

```html
...
<script src="/socker.io/socker.io.js"></script>
<script>
  const socket = io()

  socket.on('countUpdated', () => {
    //this runs on the event
  })
</script>
...
```

- to send data to the clients, you send it as arguments after the type name in `emit`
- the arguments to the emit function past the event name will all be made available to the clients callback function (order matters)

```javascript
//server
io.on('connection',  (socket) => {
  ...
  socket.emit('someRandomEvent', data1, data2)
})
```

```html
<script>
  const socket = io()
  socket.on('someRandomEvent', (data1, data2) => {
    console.log('got', data1, data2)
  })
</script>
```

- to send data from the client to the server is just the same, you use the io() object (socket) to emit an event and the server will need to listen for it

```html
<script>
  const socket = io()
  socket.on('someRandomEvent', (data1, data2) => {
    console.log('got', data1, data2)
    socket.emit('increment')
  })
</script>
```

```javascript
io.on('connection',  (socket) => {
  ...
  socket.on('increment', () => {
    count += 1
    //this ONLY sends data to this client that was connected at this time
    socket.emit('countUpdated', count)

    //emit an event to all connected clients
    io.emit('eventName', someData)
  })
})
```

- any emits within the `io.on('connection')` using the socket variable ONLY sends data to that one client that was connected that that point
- to emit data to ALL clients (including the current one) that are currently connected, you emit through the `io` object. `io.emit('eventName', data)`
- to emit data to all clients except the currently connected one, you use `socket.broadcast.emit('eventName', func)`

Rooms
- Socket io supports rooms, where clients can join specific rooms.
- only the server can do `socker.join(<ROOM_NAME>)` to join a client to a specific room
- when using rooms, you can choose to emit messages to entire rooms
- `io.to.(<ROOM_NAME>)emit` emits events to every body in a room including the current client
- `socket.broadcast.to(<ROOM_NAME>).emit(<message>)` emits events to everybody in a room `excluding` the current client

Acknowledgments
- events that are triggered/sent via websockets can have acknowledgements. This means that the client to the message and send a message back to the sender to say they have received the event.
- ack's can happen both ways, from a client to server (where the server sends the ack) or the server to client (where the client sends the ack)
- ack's are optional
- to enable ack's you need to do 2 things
  - provide a callback function to the emitting code that runs after receiving the ack, this call back is the 3rd argument to the emitter (after the data object being send)
  - update the listener of that event, so that the function takes 2 arguments instead of 1. 1st being the data object and the second is a reference to the callback function. after the function is ready, you invoke the callback, triggering the callback in the producer of the event
- not only is it possible to ack a message but it is also possible to send data back with the ack

```javascript
//producer of the event
socket.emit('eventName', "my data", () => {
  console.log('the message was delivered to the consumer');
})

...

//in the consumer
socket.on('eventName', (sentData, callback) => {
  //business logic with the sentData object
  callback(); //trigger the ack
})
```

```javascript
//producer of the event
socket.emit('eventName', "my data", (dataFromConsumer) => {
  console.log('the message was delivered to the consumer');
  console.log(dataFromConsumer);
})

...

//in the consumer
socket.on('eventName', (sentData, callback) => {
  //business logic with the sentData object
  callback("some data from the consumer"); //trigger the ack with additional data
})

```