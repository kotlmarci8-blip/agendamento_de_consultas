const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('agendado', 'confirmado', 'cancelado', 'concluido'),
        allowNull: false,
        defaultValue: 'agendado',
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    medicoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Agendamento;
