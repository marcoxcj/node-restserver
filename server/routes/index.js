const express = require('express');

const app = express();

const usuario = require('./usuario');
const login = require('./login');
const categoria = require('./categoria');
const producto = require('./producto');
const uploads = require('./uploads');
const imagenes = require('./imagenes');


app.use(usuario);
app.use(login);
app.use(categoria);
app.use(producto);
app.use(uploads);
app.use(imagenes);


module.exports = app;