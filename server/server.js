require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const usuario = require('./routes/usuario');

// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());

app.use(usuario);

let mongoDB = process.env.URLDB;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('base de datos ok');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
});