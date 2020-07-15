const fs = require("fs")
const chalk = require("chalk")

const filename = 'saveFile.json'

//write a single note to the file keeping exiting notes
const addNote = function(noteObj) {
    const existingNotes = readNotes()
    existingNotes.push(noteObj)
    const allNotesString = JSON.stringify(existingNotes)
    fs.writeFileSync(filename, allNotesString)
}

const addAllNotes = function(allNotes) {
    const allNotesString = JSON.stringify(allNotes)
    fs.writeFileSync(filename, allNotesString)
}

//return an array of notes
const readNotes = function() {
    var result
    try{
        const buffer = fs.readFileSync(filename)
        result = JSON.parse(buffer.toString());
    } catch (e) {
        result = []
    }
    return result
}

const listNotes = function() {
    const allNotes = readNotes()
    for(const note of allNotes) {
        console.log(note)
    }
}

const removeNote = function(title) {
    const allNotes = readNotes();
    const toKeep = []
    for(const note of allNotes) {
        if(note.title !== title) {
            toKeep.push(note)
        } else {
            console.log(chalk.red('Removing note'))
        }
    }
    addAllNotes(toKeep)
}

module.exports = {
    addNote : addNote,
    readNotes : readNotes,
    listNotes: listNotes,
    removeNote: removeNote
}