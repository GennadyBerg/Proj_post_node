const Sequelize = require( 'sequelize');

const sequelize = new Sequelize('users', 'user', 'password', {
    host: './dev.sqlite',
    dialect: 'sqlite',
});

module.exports = {sequelize};