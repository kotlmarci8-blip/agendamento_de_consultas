const { Paciente } = require('../models');

async function create(dados) {
    return Paciente.create(dados);
}

async function findAll() {
    return Paciente.findAll();
}

async function findById(id) {
    return Paciente.findByPk(id);
}

async function findByEmail(email) {
    return Paciente.findOne({ where: { email } });
}

async function findByCpf(cpf) {
    return Paciente.findOne({ where: { cpf } });
}

async function update(id, dados) {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return null;
    return paciente.update(dados);
}

async function remove(id) {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return null;
    await paciente.destroy();
    return paciente;
}

module.exports = {
    create,
    findAll,
    findById,
    findByEmail,
    findByCpf,
    update,
    remove,
};
