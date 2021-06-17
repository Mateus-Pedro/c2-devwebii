const mongoose = require('mongoose');

const strConnection = `mongodb+srv://devwebii:sBEEjj4Y5H6vWeEl@devweb2.hssv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(strConnection, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', () =>{
    console.log('Banco de dados Mongo conectado com sucesso');
});

module.exports = db;