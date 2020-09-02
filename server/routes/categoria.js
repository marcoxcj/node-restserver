const express = require("express");

let { verificaToken, verificaAdmin_Role } = require("../middlewares/autenticacion");

let app = express();

const Categoria = require("../models/categoria");

//mostrar todas las categorías
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion') // Ordena los resultados por la descripción
        .populate('usuario', 'nombre email') //Busca información de otros objectID de MongoDB, Se pueden traer los campos que necesite
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                categorias
            })
        })
});

//Mostrar una categoria por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El ID no fue encontrado"
                }
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//Crear nueva categoría
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    console.log(req.usuario);
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//Actualizar categoría
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//Borrar categoría
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El id no existe"
                }
            });
        };

        res.json({
            ok: true,
            message: "Categoria borrada"
        });
    })


});

module.exports = app;