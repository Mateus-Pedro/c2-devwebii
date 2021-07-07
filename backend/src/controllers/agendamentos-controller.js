const agendamentoModel = require('../models/agendamentos-model');
const unidadesModel = require('../models/unidades-model')

exports.adicionar = (req, res) => {
    agendamentoModel.find(() => {

        let id_unidade = req.body.unidade;

        unidadesModel.findById(id_unidade, (err, unidades) => {
            if (err || !unidades) {
                res.json({
                    status: 'ERRO',
                    message: `Não foi possível encontrar a unidade ${id_unidade} `,
                    stats: req.params
                })
            }
        });

        let agendamento = new agendamentoModel();

        agendamento.unidade = req.body.unidade;
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidade_especiais = req.body.necessidade_especiais;
        agendamento.observacoes = req.body.observacoes;

        agendamento.save((err) => {
            if (err) {
                res.send({
                    status: 'Erro',
                    message: 'Não foi possível inserir o agendamento'
                })
            } else {
                res.send({
                    status: 'OK',
                    message: `Agendamento para a hora ${agendamento.data_hora_agendamento} foi feito.`
                })
            }
        });

    });
}

exports.listar = (req, res) => {
    agendamentoModel.find((err, agendamento) => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: 'Não foi possível listar as agendamento'
            })
        } else {
            res.json({
                status: 'Ok',
                message: agendamento
            })
        }
    })
}

exports.listarPorId = (req, res) => {
    let id_agendamento = req.params.id

    agendamentoModel.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento) {
            res.json({
                status: 'ERRO',
                message: `Não foi encontrado agendamento com o ID ${id_agendamento}`
            })
        } else {
            res.json({
                status: 'OK',
                message: agendamento
            })
        }
    })
}

exports.atualizar = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento) {
            res.json({
                status: 'Erro',
                message: `Não foi possível atualizar o agendamento de ID ${id_agendamento}`
            })
        } else {

            agendamento.data_hora_agendamento = req.body.data_hora_agendamento;

            if (req.body.necessidade_especiais != null)
                agendamento.necessidade_especiais = req.body.necessidade_especiais;

            if (req.body.observacoes != null)
                agendamento.observacoes = req.body.observacoes;

            agendamento.data_alteracao = Date();

            agendamento.save((err) => {
                if (err) {
                    res.json({
                        status: 'Erro',
                        message: `Houve um erro ao atualizar o agendamento do dia ${agendamento.data_hora_agendamento}`
                    })
                } else {
                    res.json({
                        status: 'Ok',
                        message: `O agendamento do dia ${agendamento.data_hora_agendamento} foi atualizado com sucesso`,
                        novoAgendamento: agendamento
                    })
                }
            })
        }
    })
}

exports.remover = (req, res) => {
    let id_agendamento = req.params.id

    agendamentoModel.remove({
        _id: id_agendamento
    }, (err, agendamentos) => {
        if (err) {
            res.json({
                status: 'ERROR',
                message: `Não foi possível remover o agendamento do dia ${agendamentos.data_hora_agendamento}`
            })
        } else {
            res.json({
                status: 'OK',
                message: 'O agendamento selecionado foi deletado com sucesso'
            })
        }
    })
}