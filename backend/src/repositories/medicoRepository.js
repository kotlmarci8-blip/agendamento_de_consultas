const { Medico } = require('../models');

async function create(dados) {
    return Medico.create(dados);
}

async function findAll() {
    return Medico.findAll();
}

async function findById(id) {
    return Medico.findByPk(id);
}

async function findByEmail(email) {
    return Medico.findOne({ where: { email } });
}

async function update(id, dados) {
    const medico = await Medico.findByPk(id);
    if (!medico) {
        return null;
    }
    return medico.update(dados);
}

async function remove(id) {
    const medico = await Medico.findByPk(id);
    if (!medico) {
        return null;
    }
    await medico.destroy();
    return medico;
}

module.exports = {
    create,
    findAll,
    findById,
    findByEmail,
    update,
    remove,
};
