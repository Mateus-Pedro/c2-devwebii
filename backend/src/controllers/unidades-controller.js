const unidadesModel = require('../models/unidades-model')

exports.adicionar = (req, res) => {
    unidadesModel.find((err, unidades) => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: 'Não foi possível recuperar a unidade'
            })
        }

        for (let i = 0; i < unidades.length; i++) {
            if (req.body.nome == unidades[i].nome) {
                res.json({
                    status: 'ERRO',
                    message: `A Unidade ${req.body.nome} já está cadastrada no endereço ${req.body.endereco}`
                })
                return
            }
        }

        let unidade = new unidadesModel();
        unidade.nome = req.body.nome;
        unidade.descricao = req.body.descricao;
        unidade.endereco = req.body.endereco;
        unidade.telefone = req.body.telefone;
        unidade.email = req.body.email;

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

            if (req.body.nome != null)
                unidades.nome = req.body.nome;

            if (req.body.descricao != null)
                unidades.descricao = req.body.descricao;

            if (req.body.endereco != null)
                unidades.endereco = req.body.endereco;

            if (req.body.telefone != null)
                unidades.telefone = req.body.telefone;

            if (req.body.email != null)
                unidades.email = req.body.email;

            unidades.data_alteracao = Date();

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