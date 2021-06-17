const unidadesModel = require('../models/unidades-model')

exports.adicionar = (req, res) => {
    unidadesModel.find(err => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: 'Não foi possível recuperar a unidade'
            })
        }

        let unidade = new unidadesModel();
        unidade.nome = req.body.nome;
        unidade.descricao = req.body.descricao;
        unidade.endereco = req.body.endereco;
        unidade.telefone = req.body.telefone;
        unidade.email = req.body.email;
        unidade.latlong = req.body.latlong;

        unidade.save((err) => {
            if (err) {
                res.send({
                    status: 'Error',
                    message: 'Não foi possível inserir a unidade'
                });
            } else {
                res.send({
                    status: 'Ok',
                    message: `A unidade ${unidade.nome} foi inserida.`
                });
            }
        });
    });
}

exports.listar = (req, res) => {
    unidadesModel.find((err, unidades) => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: 'Não foi possível listar as unidades'
            })
        } else {
            res.json({
                status: 'Ok',
                message: unidades
            })
        }
    })
}

exports.listarPorID = (req, res) => {
    let id_unidade = req.params.id;

    unidadesModel.findById(id_unidade, (err, unidades) => {
        if (err || !unidades) {
            res.json({
                status: 'ERRO',
                message: `Não foi possivel encontrar a unidade ${id_unidade}`
            })
        } else {
            res.json({
                status: 'OK',
                message: unidades
            })
        }
    })
}

exports.atualizar = (req, res) => {
    let id_unidade = req.params.id;

    unidadesModel.findById(id_unidade, (err, unidades) => {
        if (err || !unidades) {
            res.json({
                status: 'ERRO',
                message: `Não foi possível atualizar a unidade com id ${id_unidade} `
            })
        } else {
            unidades.nome = req.body.nome;
            unidades.descricao = req.body.descricao;
            unidades.endereco = req.body.endereco;
            unidades.telefone = req.body.telefone;
            unidades.email = req.body.email;
            unidades.latlong = req.body.latlong;
            unidades.data_alteracao = Date.now();

            unidades.save((err) => {
                if (err) {
                    res.json({
                        status: 'ERRO',
                        message: `Houve um erro ao atualizar a unidade ${unidades.nome}`
                    })
                } else {
                    res.json({
                        status: 'OK',
                        message: `A unidade ${unidades.nome} foi atualizado com sucesso`,
                        novaUnidade: unidades
                    })
                }
            })
        }
    })
}

exports.remover = (req, res) => {
    let id_unidade = req.params.id;

    unidadesModel.remove({
        _id: id_unidade
    }, (err, unidades) => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: `Não foi possível remover a unidade ${unidades.nome}`
            })
        } else {
            res.json({
                status: 'Ok',
                message: 'A unidade foi deletada com sucesso'
            })
        }
    })
}