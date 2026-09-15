const sequelize = require('../config/database');
const Agendamento = require('./Agendamento');
const Medico = require('./Medico');
const Paciente = require('./Paciente');
const Disponibilidade = require('./Disponibilidade');

Medico.hasMany(Agendamento, { foreignKey: 'medicoId' });
Agendamento.belongsTo(Medico, { foreignKey: 'medicoId' });

Paciente.hasMany(Agendamento, { foreignKey: 'pacienteId' });
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Medico.hasMany(Disponibilidade, { foreignKey: 'medicoId' });
Disponibilidade.belongsTo(Medico, { foreignKey: 'medicoId' });

module.exports = {
    sequelize,
    Agendamento,
    Medico,
    Paciente,
    Disponibilidade,
};
