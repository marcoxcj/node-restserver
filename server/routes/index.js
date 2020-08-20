const express = require('express');

const app = express();

const usuario = require('./usuario');
const login = require('./login');
const categoria = require('./categoria');
const producto = require('./producto');

app.use(usuario);
app.use(login);
app.use(categoria);
app.use(producto);

module.exports = app;