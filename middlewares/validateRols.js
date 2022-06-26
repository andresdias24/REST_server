const { response } = require('express');

const esAdminRole = async (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'No hay usuario'
        });
    }
    const usuario = req.usuario;
    if (usuario.role !== 'ADMIN_ROLE') {

        return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para esta accion'
        });
    }

    next()

}
const tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                msg: 'No hay usuario'
            });
        }
        const usuario = req.usuario;

        if ( !roles.includes(usuario.rol)) {
            return res.status(401).json({
                ok: false,
                msg: `El servicio no esta disponible para el rol ${usuario.rol} debe ser ${roles}`
            });
        }
        next()

    }
}


module.exports = {
    esAdminRole,
    tieneRol
}