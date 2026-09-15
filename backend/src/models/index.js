const sequelize = require('../config/database');
const Agendamento = require('./Agendamento');
const Medico = require('./Medico');
const Paciente = require('./Paciente');

Medico.hasMany(Agendamento, { foreignKey: 'medicoId' });
Agendamento.belongsTo(Medico, { foreignKey: 'medicoId' });

Paciente.hasMany(Agendamento, { foreignKey: 'pacienteId' });
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

module.exports = {
    sequelize,
    Agendamento,
    Medico,
    Paciente,
};
