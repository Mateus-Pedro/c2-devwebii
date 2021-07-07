const mongoose = require('mongoose');

const unidadeSchema = mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_alteracao: {
        type: mongoose.Schema.Types.Date,
        default: null
    }
});

let Unidade = module.exports = mongoose.model('unidade', unidadeSchema);

module.exports.get = function (callback, limit) {
    Unidade.find(callback).limit(limit)
}