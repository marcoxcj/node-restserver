const express = require('express');

const app = express();

const usuario = require('./usuario');
const login = require('./login');

app.use(usuario);
app.use(login);

module.exports = app;