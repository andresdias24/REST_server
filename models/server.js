const express = require('express')

const {dbConection} = require('../DB/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariospPath = '/api/usuarios';
        this.authPath = '/api/auth';
        // conect db
        this.conectDB();

        // midelwares
        this.middlewares();
        // rutas de mi aplicacion
        this.routes();
        
    }
    async conectDB() {
        await dbConection();
    }
    
    middlewares() {
        // escuchar peticiones
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use( this.usuariospPath, require('../routes/user'));
        this.app.use( this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port,  () => {
            console.log('Example app listening on port' + this.port)
        })
    }
}

module.exports =  Server;