const pessoasModel = require('../models/pessoas-model')
const mongodb = require('../infra/mongodb')

exports.adicionar = (req, res) => {
    pessoasModel.find((err, pessoas) => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: 'Não foi possível recuperar as pessoas'
            })
        }

        for (let i = 0; i < pessoas.length; i++) {
            if (req.body.email == pessoas[i].email) {
                res.json({
                    status: 'ERRO',
                    message: `A pessoa ${req.body.nome} já está cadastrada com o email ${req.body.email}`
                })
                return
            }
        }

        let pessoa = new pessoasModel();
        pessoa.nome = req.body.nome;
        pessoa.cpf = req.body.cpf;
        pessoa.data_nascimento = req.body.data_nascimento;
        pessoa.telefone = req.body.telefone;
        pessoa.grupo_prioritario = req.body.grupo_prioritario;
        pessoa.endereco = req.body.endereco;
        pessoa.email = req.body.email;

        pessoa.save((err) => {
            if (err) {
                res.send({
                    status: 'Error',
                    message: 'Não foi possível inserir a pessoa'
                });
            } else {
                res.send({
                    status: 'Ok',
                    message: `A pessoa ${pessoa.nome} foi inserida com sucesso`
                });
            }
        });
    });
}

exports.listar = (req, res) => {
    pessoasModel.find((err, pessoas) => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: 'Não foi possível listar as pessoas'
            })
        } else {
            res.json({
                status: 'Ok',
                message: pessoas
            })
        }
    })
}

exports.listarPorID = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (err, pessoas) => {
        if (err || !pessoas) {
            res.json({
                status: 'ERRO',
                message: `Não foi possivel encontrar a pessoa ${id_pessoa}`
            })
        } else {
            res.json({
                status: 'OK',
                message: pessoas
            })
        }
    })
}

exports.atualizar = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (err, pessoas) => {
        if (err || !pessoas) {
            res.json({
                status: 'ERRO',
                message: `Não foi possível atualizar a pessoa com id ${id_pessoa} `,
                stats: req.params
            })
        } else {
            if (req.body.nome != null)
                pessoas.nome = req.body.nome;

            if (req.body.cpf != null)
                pessoas.cpf = req.body.cpf;

            if (req.body.data_nascimento != null)
                pessoas.data_nascimento = req.body.data_nascimento;

            if (req.body.telefone != null)
                pessoas.telefone = req.body.telefone;

            if (req.body.grupo_prioritario != null)
                pessoas.grupo_prioritario = req.body.grupo_prioritario;

            if (req.body.cpf != null)
                pessoas.endereco = req.body.endereco;

            if (req.body.email != null)
                pessoas.email = req.body.email;

            pessoas.data_alteracao = Date.now();

            pessoas.save((err) => {
                if (err) {
                    res.json({
                        status: 'ERRO',
                        message: `Houve um erro ao atualizar a pessoa ${pessoas.nome}`,
                        stats: req.params
                    })
                } else {
                    res.json({
                        status: 'OK',
                        message: `Os dados de ${pessoas.nome} foram atualizados com sucesso`,
                        novaPessoa: pessoas,
                        stats: req.params
                    })
                }
            })
        }
    })
}

exports.remover = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.remove({
        _id: id_pessoa
    }, (err, pessoas) => {
        if (err) {
            res.json({
                status: 'ERRO',
                message: `Não foi possível remover a pessoa ${pessoas.nome}`
            })
        } else {
            res.json({
                status: 'Ok',
                message: `A pessoa foi deletada com sucesso`
            })
        }
    })
}