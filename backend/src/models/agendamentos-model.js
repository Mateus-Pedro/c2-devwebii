const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    necessidade_especiais: {
        type: mongoose.Schema.Types.Boolean,
        required: false
    },
    observacoes: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    data_criacao: {
        type: mongoose.Schema.Types.Date,
        default: Date()
    },
    data_alteracao: {
        type: mongoose.Schema.Types.Date,
        default: null
    }
});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function (callback, limit) {
    Agendamento.find(callback).limit(limit)
}