const fs = require('fs')
const chalk = require('chalk')

// Get all notes
const getAllNotes = function () { 
    // console.log(loadNotes())
    return loadNotes()
}

// Get note having a particular title
const getNote = title => {
    const allNotes = loadNotes()
    const oneNote = allNotes.find(note => title === note.title)
    if (oneNote) {
        console.log(chalk.green.inverse('Found'))
        console.log(oneNote)
    } else {
        console.log(chalk.red.inverse('Not Found!!'))
    }
}

// Add note
const addNote = (title, body) => {
    const allNotes = loadNotes();
    console.log('All notes: ' + allNotes)
    const containsTitle = allNotes.filter(note => title === note.title)
    if (containsTitle.length === 0) {
        allNotes.push({
            title: title,
            body: body
        })
        const newNotes = JSON.stringify(allNotes);
        fs.writeFileSync('notes.json', newNotes)
        console.log(chalk.green.inverse('Note Saved!!'))
    } else 
        console.log(chalk.red.inverse('Note already Exists!!'))
}

// Remove note by title
const removeNotes = title => {
    const allNotes = loadNotes();
    const newNotes = allNotes.filter(note => title !== note.title)
    if (newNotes.length === allNotes.length)
        console.log(chalk.red.inverse('No note found!!'))
    else {
        fs.writeFileSync('notes.json', JSON.stringify(newNotes))
        console.log(chalk.green.inverse('Notes removed!!'))
    }
}

const loadNotes = () => {
    try {
        const fileContent = fs.readFileSync('notes.json')
        const fileJson = fileContent.toString() 
        if (fileJson === '')
            return []
        return JSON.parse(fileJson)
    } catch (e) {
        return []
    }
}

module.exports = {
    getAllNotes: getAllNotes,
    addNote: addNote,
    getNote: getNote,
    removeNotes: removeNotes
} 
