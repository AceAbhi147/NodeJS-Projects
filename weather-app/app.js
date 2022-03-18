const request = require('request')
const chalk = require('chalk')
const geocoding = require('./utils/geocoding')
const weather = require('./utils/weather-app')
const yargs = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'address',
    descrddddibe: 'Address to fetch weather',
    builder: {
        address: {
            description: 'Address to fetch weather',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        geocoding(argv.address, (errorMessage, { latitude, longitude } = {}) => {
            if (errorMessage) {
                console.log(chalk.red.inverse(errorMessage))
            } else {
                console.log(chalk.green.inverse(latitude + ' ' + longitude))
                weather(latitude, longitude, (errorMessage, {temperature, unit} = {}) => {
                    if (errorMessage) {
                        console.log(chalk.red.inverse(errorMessage))
                    } else {
                        console.log(chalk.green.inverse('Current temperature in ' + argv.address + ' is : ' + 
                                        temperature + ' ' + unit))
                    }
                })
            }
        })
    }
})

console.log(process.argv)
// console.log(yargs.argv)
yargs.parse()