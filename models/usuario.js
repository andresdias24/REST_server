const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    correo: {
        type: String,
        required: [true, "El email es necesario"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "la contrasela es requerida"],
        // minlength: [8, "la contrasela debe tener al menos 8 caracteres"],
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    google: {
        type: Boolean,
        default: false,
        required: true
    }
}
, { timestamps: true });

module.exports = model("Usuario", usuarioSchema);