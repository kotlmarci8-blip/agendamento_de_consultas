const { Disponibilidade } = require('../models');

async function create(dados) {
    return Disponibilidade.create(dados);
}

async function findAll() {
    return Disponibilidade.findAll();
}

async function findById(id) {
    return Disponibilidade.findByPk(id);
}

async function findByMedico(medicoId) {
    return Disponibilidade.findAll({ where: { medicoId } });
}

async function findByMedicoEDiaSemana(medicoId, dia_semana) {
    return Disponibilidade.findAll({ where: { medicoId, dia_semana } });
}

async function update(id, dados) {
    const disponibilidade = await Disponibilidade.findByPk(id);
    if (!disponibilidade) return null;
    return disponibilidade.update(dados);
}

async function remove(id) {
    const disponibilidade = await Disponibilidade.findByPk(id);
    if (!disponibilidade) return null;
    await disponibilidade.destroy();
    return disponibilidade;
}

module.exports = {
    create,
    findAll,
    findById,
    findByMedico,
    findByMedicoEDiaSemana,
    update,
    remove,
};
