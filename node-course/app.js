const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')

// console.log(process.argv)

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            description: "Title of the Note",
            demandOption: true,
            type: 'string'
        },
        body: {
            description: "Body of the Note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//remove 
yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder: {
        title: {
            description: "Title of the Note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNotes(argv.title)
    }
})

//list
yargs.command({
    command: 'list',
    describe: 'Show all notes',
    handler: function() {
        console.log(chalk.yellow.inverse('Your notes!!'))
        console.log(chalk.green.inverse(notes.getAllNotes()))
        notes.getAllNotes().forEach(element => {
            console.log(element.title + ' ' + element.body)
        });
    }
})

//get Note by title
yargs.command({
    command: 'get',
    describe: 'Get note by title',
    builder: {
        title: {
            description: "Title",
            demandOption: true,
            type: 'string'
        }
        
    },
    handler: function(argv) {
        notes.getNote(argv.title)
    }
})

// add, remove, read, list
// console.log(yargs.argv)
yargs.parse()
