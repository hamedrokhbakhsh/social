const mongoose = require('mongoose')
const colors = require('colors')

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);


class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb://127.0.0.1:27017/twiter")
            .then(() => {
                console.log('connnnnect'.brightWhite.bgWhite)
            })
            .catch(
                err => {
                    console.log('err connection'.brightWhite.bgWhite)
                }
            )
    }
}


module.exports = new Database();
