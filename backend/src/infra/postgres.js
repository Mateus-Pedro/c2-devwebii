const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(
    `postgres://postgres:Faesa123@postgres.cg0e3ongpi7b.us-east-2.rds.amazonaws.com:5432/postgres`, 
    {dialect: 'postgres'});

const sincronizarPostgres = async() => {
    try {
        sequelize.sync();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sequelize, Sequelize, sincronizarPostgres};