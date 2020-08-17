//==================
// Puerto
//==================

process.env.PORT = process.env.PORT || 3000;


//==================
// Entorno
//==================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==================
// Bse de datos
//==================
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://test:123@cluster0-ofofh.mongodb.net/cafe?retryWrites=true&w=majority';
};

process.env.URLDB = urlDB;