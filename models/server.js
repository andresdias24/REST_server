const express = require('express')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariospPath = '/api/usuarios';
        
        
        // midelwares
        this.middlewares();
        // rutas de mi aplicacion
        this.routes();


    }

    middlewares() {
        // escuchar peticiones
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use( this.usuariospPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port,  () => {
            console.log('Example app listening on port' + this.port)
        })
    }
}

module.exports =  Server;