const fs = require('fs')
const path = require('path')

const util = {
    isFile: fileName => {
        return fs.lstatSync(fileName).isFile()
    }
}



module.exports = util