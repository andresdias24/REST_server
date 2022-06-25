const mongoose = require('mongoose');

const dbConection = async () => {
    
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Base de datos online');

    }
    catch (error) {
        console.log(error);
        throw new Error(error, 'Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConection
}   