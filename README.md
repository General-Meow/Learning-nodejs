## learning node

#### commands
- node -v             : get version of node
- node <FILENAME.JS>  : execute the file (script)
- npm -v              : get version of npm
- npm init            : initializes the project by creating configuration files (package.json)
- npm install <MODULE> : installs the module into your project / application in node_modules directory and a line in the package.json file and updates the package-lock.json
- npm install <MODULE>@<VERSION> : installs a specific version of a module
- npm install         : using the package.json and package-lock.json, reinstall all the modules (dependencies) into the node_modules dir
- npm install -g <MODULE> : install a module globally (on the operating system), so you dont need to import it and allows you to use it in the terminal
- you should try and avoid installing global dependencies as it wont be managed in your package.json. if you can, install it as a dev dependency with `--save-dev`
  - the issue with this is that the dependency/tool wont be able to be used on the cli BUT you'll be able to use it in an npm script, this way it'll be versioned
- npm run <script command> : run a script defined in the package.json file
- nvm ...             : change the version of node

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


#### Typescript
- npm install -g typescript  : install typescript globally to use its tools (`tsc` and `tsserver`). if you dont want to install it globally, you can run it from node_modules `./node_modules/.bin/tsc --init`
- npm install -D typescript  : install typescript as a dev dependency to a node project
- npm install -D tslint      : install linting
- npm install -D @types/<MODULE> : install the types of the module, usually do this after installing the module itself with `npm -i <MODULE>`
- tsconfig.json         : ts configuration file containing compiler options, typically contains the following (it can also be generated using `tsc --init` https://www.typescriptlang.org/docs/handbook/compiler-options.html)
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
console.log(process.argv)
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
const request = require('request')

request({url: 'the url', json: true}, (error, response) => {
  console.log(resonse.body)
})
```

- creating your own functions with callbacks is easy, remember, in JS functions are a first class citizen, meaning they can be passed around just like variables/objects
  - you define a function with a callback just like a function with variables, the arguments can be functions
  - within your function, you just trigger your argument function with brackets

```javascript

const myFunctionWithCallback = function(aVariable, callbackFunc) {

}

myFunctionWithCallback(10, (result) => {
  console.log("the result from the function call is: " + result)
})
```

#### Web server

- express is the go to web framework
- install express with `npm install express`
- import the express function with `const express = require('express')`
  - create an express obj with `const app = express()`
  - this object can be called with various methods to setup routes and related functions
  - e.g. `app.get('', (req, res) => { res.send('hello')})` this maps a function to the root and returns "hello" as a response
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
- To customise express, you can use the `app.use()` method.
  - it does many things, but one thing it can do is setup a directory to serve static files from `app.use(express.static('/full path'))`
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
  - if you want to change the directory where the dynamic templates are stored, you set the `views` property `apps.set('views', DIRECTORY_STRING)` (you can use the path.join and __dirname)
  - to look at the properties that are avaliable to change for express, look at the documentation for the `set` function on `app`
  - to create links between pages, just use the `a href` to point to the mapping
- Generic error pages
  - express support wild card paths with `*`, these need to be placed after all the other routes
  - this works because page matching works top to bottom, matching on static files, the configured routes then the last, catch all wildcard
  - you can use wildcard within a route, so `/help/*` will match on any page prepended with `/help`
  - request params can be accessed via the `request.query` object

```javascript

app.get('reoute...', (req, res) => {
  console.log(req.query) //prints out all query params as a json obj
})
```

#### Heroku
- `heroku keys:add` : add and upload ssh keys
- `heroku apps:create <project_name>` : create a new app project in heroku, this returns a url for the app and a repo location. If you run this in your git proj dir, it also adds a remote repo with the url

- You need to have a `start` script in your package.json in order for heroku to run the app
- `start` needs to have the run command, something like `node src/app.js`
- heroku runs your app on a dynamic port, this means that if your app binds to a specific port, you need to make a change to use the dynamic port which is set as an environment variable

```javascript
const port = process.env.PORT || 3000  //PORT is what heroku sets, if this is not set (like when running locally), then use port 3000 by default

app.listen(port, () => { console.log("app now running on port", port) })
```

- any requests made in JS that call a local service should not use an absolute path but a relative one