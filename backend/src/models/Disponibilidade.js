const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disponibilidade = sequelize.define('Disponibilidade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    medicoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dia_semana: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 6,
        },
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    hora_fim: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    duracao_consulta_minutos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
    },
});

module.exports = Disponibilidade;
