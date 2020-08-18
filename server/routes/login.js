const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const app = express();

app.post('/login', (req, res) => {
    let body = req.body;


    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        console.log(usuarioDB, "usuarioDB");
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        };

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        };

        // let usuario = await JSON.parse(JSON.stringify(usuarioDB));
        // console.log(usuario, "hola");

        try {
            let token = jwt.sign({
                usuario: usuarioDB
            }, 'este-es-el-seed-desarrollo', { expiresIn: process.env.CADUCIDAD_TOKEN });

            console.log(body, "body");

            res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });
        } catch (error) {
            console.log(error);
        }



    });


});



module.exports = app;