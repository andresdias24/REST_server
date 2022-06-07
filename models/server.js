const express = require('express')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        // midelwares
        this.middlewares();
        // rutas de mi aplicacion

        this.routes();
    }

    middlewares() {
        // directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        
        this.app.get('/')
    }

    listen() {
        this.app.listen(this.port,  () => {
            console.log('Example app listening on port' + this.port)
        })
    }
}

module.exports =  Server;