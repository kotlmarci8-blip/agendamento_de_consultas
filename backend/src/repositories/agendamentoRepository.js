const { Op } = require('sequelize');
const { Agendamento, Medico, Paciente } = require('../models');

const includeRelacionamentos = [
    { model: Medico },
    { model: Paciente },
];

async function create(dados) {
    return Agendamento.create(dados);
}

async function findAll() {
    return Agendamento.findAll({
         include: includeRelacionamentos 
        });
}

async function findById(id) {
    return Agendamento.findByPk(id, {
         include: includeRelacionamentos 
        });
}

async function findByMedico(medicoId) {
    return Agendamento.findAll({
        where: { medicoId },
        include: includeRelacionamentos,
    });
}

async function findByPaciente(pacienteId) {
    return Agendamento.findAll({
        where: { pacienteId },
        include: includeRelacionamentos,
    });
}

async function findByMedicoEData(medicoId, data) {
    const inicioDoDia = new Date(`${data}T00:00:00`);
    const fimDoDia = new Date(`${data}T23:59:59`);

    return Agendamento.findAll({
        where: {
            medicoId,
            data_hora: { [Op.between]: [inicioDoDia, fimDoDia] },
        },
        include: includeRelacionamentos,
    });
}

async function update(id, dados) {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
        return null;
    }
    return agendamento.update(dados);
}

async function remove(id) {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
        return null;
    }
    await agendamento.destroy();
    return agendamento;
}

module.exports = {
    create,
    findAll,
    findById,
    findByMedico,
    findByPaciente,
    findByMedicoEData,
    update,
    remove,
};
