const agendamentoModelPg = require('../models/agendamentos-model-pg');


exports.adicionarPg = async (req, res) => {
    const agendamento = req.body;

    const agendamentoExistente = await agendamentoModelPg.findAll({
        where: {
            data_hora_agendamento: agendamento.data_hora_agendamento
        }
    });

    if (agendamentoExistente.length > 0) {
        res.json({
            status: 'Ok',
            message: 'Agendamento existente para este horário'
        });
    } else {
        const agendamento = await agendamentoModelPg.create({
            data_hora_agendamento: agendamento.data_hora_agendamento,
            necessidade_especiais: agendamento.necessidade_especiais,
            observacoes: agendamento.observacoes
        });
        res.json({
            status: 'Ok',
            message: agendamento
        });
    }
}

exports.listarPg = async res => {
    const agendamentos = await agendamentoModelPg.findAll();
    res.json({
        status: 'Ok',
        message: agendamentos
    });
}

exports.listarPorIdPg = async (req, res) => {

    let id_agendamento = req.params.id_agendamento;

    const agendamento = await agendamentoModelPg.findByPk(id_agendamento);

    if (agendamento) {
        res.json({
            status: 'Ok',
            agendamento: agendamento
        });
    } else {
        res.json({
            status: 'erro',
            message: `Não foi possível recuperar o agendamento de ID ${id_agendamento}`
        });
    }

}

exports.atualizarPg = async (req, res) => {
    let id_agendamento = req.params.id_agendamento;

    let newAgendamento = {
        data_hora_agendamento: req.body.data_hora_agendamento,
        necessidade_especiais: req.body.necessidade_especiais,
        observacoes: req.body.observacoes
    }

    if (id_agendamento) {
        let agendamento = await agendamentoModelPg.update(newAgendamento, { where: { id: id_agendamento } })

        if (agendamento) {
            res.json({
                status: 'Ok',
                message: 'Agendamento atualizado!'
            });
        } else {
            res.json({
                status: 'erro',
                message: `Não foi possível atualizar o agendamento de ID ${id_agendamento}`
            })
        }
    }
}

exports.removerPg = async (req, res) => {
    let id_agendamento = req.params.id_agendamento;
    if (id_agendamento) {
        let agendamentoDeletado = await agendamentoModelPg.destroy({ where: { id_agendamento } });
        if (agendamentoDeletado) {
            res.json({
                status: 'Ok',
                message: `Agendamento de ID ${id_agendamento} deletado!`
            })
        } else {
            res.json({
                status: 'erro',
                message: `Não foi possível remover o agendamento de ID ${id_agendamento}`
            })
        }
    }
}