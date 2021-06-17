const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    necessidade_especiais: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    observacoes: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    data_criacao: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
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