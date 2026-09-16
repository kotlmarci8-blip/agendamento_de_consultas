const bcrypt = require('bcryptjs');
const medicoRepository = require('../repositories/medicoRepository');
const agendamentoRepository = require('../repositories/agendamentoRepository');
const AppError = require('../errors/AppError');
const { isValidEmail, isValidCrm } = require('../utils/validators');

const SALT_ROUNDS = 10;
const STATUS_AGENDAMENTO_ATIVOS = ['agendado', 'confirmado'];

function validarDadosObrigatorios({ nome, crm, especialidade, email, senha }) {
    if (!nome || !crm || !especialidade || !email || !senha) {
        throw new AppError('Nome, CRM, especialidade, email e senha são obrigatórios.');
    }
}

function validarFormatoCrm(crm) {
    if (!isValidCrm(crm)) {
        throw new AppError('CRM inválido. Formato esperado: 12345-UF.');
    }
}

function validarFormatoEmail(email) {
    if (!isValidEmail(email)) {
        throw new AppError('Email inválido.');
    }
}

async function garantirCrmDisponivel(crm) {
    const existente = await medicoRepository.findByCrm(crm);
    if (existente) {
        throw new AppError('CRM já cadastrado.', 409);
    }
}

async function garantirEmailDisponivel(email) {
    const existente = await medicoRepository.findByEmail(email);
    if (existente) {
        throw new AppError('Email já cadastrado.', 409);
    }
}

function sanitizar(medico) {
    if (!medico) return medico;
    const { senha, ...dados } = medico.toJSON ? medico.toJSON() : medico;
    return dados;
}

async function create(dados) {
    validarDadosObrigatorios(dados);
    validarFormatoCrm(dados.crm);
    validarFormatoEmail(dados.email);

    await garantirCrmDisponivel(dados.crm);
    await garantirEmailDisponivel(dados.email);

    const senhaHash = await bcrypt.hash(dados.senha, SALT_ROUNDS);

    const medico = await medicoRepository.create({
        ...dados,
        senha: senhaHash,
    });

    return sanitizar(medico);
}

async function findAll({ incluirInativos = false } = {}) {
    const medicos = await medicoRepository.findAll();
    const filtrados = incluirInativos ? medicos : medicos.filter((m) => m.ativo);
    return filtrados.map(sanitizar);
}

async function findById(id) {
    const medico = await medicoRepository.findById(id);
    if (!medico) {
        throw new AppError('Médico não encontrado.', 404);
    }
    return sanitizar(medico);
}

async function update(id, dados) {
    const medico = await medicoRepository.findById(id);
    if (!medico) {
        throw new AppError('Médico não encontrado.', 404);
    }

    const atualizacoes = { ...dados };

    if ('crm' in atualizacoes && atualizacoes.crm !== medico.crm) {
        throw new AppError('Alteração de CRM não é permitida.');
    }
    delete atualizacoes.crm;

    if (atualizacoes.email && atualizacoes.email !== medico.email) {
        validarFormatoEmail(atualizacoes.email);
        await garantirEmailDisponivel(atualizacoes.email);
    }

    if (atualizacoes.senha) {
        atualizacoes.senha = await bcrypt.hash(atualizacoes.senha, SALT_ROUNDS);
    }

    const atualizado = await medicoRepository.update(id, atualizacoes);
    return sanitizar(atualizado);
}

async function remove(id) {
    const medico = await medicoRepository.findById(id);
    if (!medico) {
        throw new AppError('Médico não encontrado.', 404);
    }

    const agendamentos = await agendamentoRepository.findByMedico(id);
    const possuiAgendamentoFuturo = agendamentos.some(
        (a) => STATUS_AGENDAMENTO_ATIVOS.includes(a.status) && new Date(a.data_hora) > new Date()
    );

    if (possuiAgendamentoFuturo) {
        throw new AppError('Médico possui agendamentos futuros e não pode ser removido.', 409);
    }

    const desativado = await medicoRepository.update(id, { ativo: false });
    return sanitizar(desativado);
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
};
