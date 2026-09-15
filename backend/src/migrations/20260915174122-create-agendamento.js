'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Agendamentos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            data_hora: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('agendado', 'confirmado', 'cancelado', 'concluido'),
                allowNull: false,
                defaultValue: 'agendado',
            },
            observacoes: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            medicoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Medicos',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            pacienteId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Pacientes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Agendamentos');
    },
};
