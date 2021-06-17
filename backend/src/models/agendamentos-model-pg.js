const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const AgendamentoModel = postgres.define('agendamento', {

    id_agendamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_hora_agendamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    necessidade_especiais: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_criacao: {
        type: Sequelize.DATE,
        default: Date.now()
    },
    data_alteracao: {
        type: Sequelize.DATE,
        default: null
    },
})

module.exports = AgendamentoModel;