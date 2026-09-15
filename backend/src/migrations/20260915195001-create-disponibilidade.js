'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Disponibilidades', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            dia_semana: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            hora_inicio: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            hora_fim: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            duracao_consulta_minutos: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 30,
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
        await queryInterface.dropTable('Disponibilidades');
    },
};
