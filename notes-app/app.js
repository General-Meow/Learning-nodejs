const yargs = require("yargs")
const utils = require("./utils")
const { string } = require("yargs")

// console.log('The provided args are:', process.argv)


yargs.command({
    command: 'add',
    description: 'Add a note to the app',
    builder: {
        title: {
            describe: "title of the note",
            demandOption: true,
            type: String
        },
        body: {
            describe: "the body of the note",
            demandOption: true,
            type: String
        }
    },
    handler: function(args) {
        utils.addNote({
            title: args.title,
            body: args.body
        })
    }
})

yargs.command({
    command: 'list',
    description: 'List all the current notes',
    handler: function(args) {
        utils.listNotes()
    }
})

yargs.command({
    command: 'remove',
    description: 'remove a note by its title',
    builder: {
        title : {
            description: 'the title of the note to remove',
            demandOption: true,
            type: String
        }
    },
    handler: function(args){
        utils.removeNote(args.title)
    }
})

//init yargs
yargs.parse()

// if(yargs.argv._.length == 0) {
//     console.log("Please use --help to get more info")
// }
