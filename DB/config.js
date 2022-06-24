const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }, err => {
            if(err) throw err;
            console.log('Connected to MongoDB!!!')
        })
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConection
}   