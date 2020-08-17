const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');


const app = express();

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    let estadoTrue = {
        estado: true
    };

    Usuario.find(estadoTrue, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.countDocuments(estadoTrue, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    usuarios
                });
            });

        });
});

app.post('/usuario', function(req, res) {

    let body = req.body;
    console.log(body);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        //delete usuarioDB.password

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //pick: regresa los valores que deseas de un objeto
    let body = _.pick(req.body, ['email', 'nombre', 'img', 'role', 'estado']);

    //new: retorna el nuevo valor modificado en la respuesta
    //runValidators: activa las validacion que agregue
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        };
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;