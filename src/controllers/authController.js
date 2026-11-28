const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'lenas_token';

function criarToken(cliente) {
    return jwt.sign(
        { id: cliente.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

function configurarCookie(res, token) {
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}


async function cadastrar(req, res) {
    try {
        const { nome, telefone, email, senha } = req.body;

        if (!nome || !telefone || !email || !senha) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
        }

        if (senha.length < 8) {
            return res.status(400).json({
                mensagem: 'A senha deve ter pelo menos 8 caracteres.'
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const clienteExistente = await prisma.cliente.findUnique({
            where: { email: emailNormalizado }
        });

        if (clienteExistente) {
            return res.status(409).json({
                mensagem: 'Este e-mail já possui cadastro.'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const cliente = await prisma.cliente.create({
            data: {
                nome: nome.trim(),
                telefone: telefone.trim(),
                email: emailNormalizado,
                senha: senhaHash
            }
        });

        const token = criarToken(cliente);
        configurarCookie(res, token);

        return res.status(201).json({
            mensagem: 'Cadastro realizado com sucesso!',
            cliente: {
                id: cliente.id,
                nome: cliente.nome,
                telefone: cliente.telefone,
                email: cliente.email
            }
        });

    } catch (erro) {
        console.error('Erro no cadastro:', erro);

        return res.status(500).json({
            mensagem: 'Erro ao realizar cadastro.'
        });
    }
}

// LOGIN
async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Informe o e-mail e a senha.'
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const cliente = await prisma.cliente.findUnique({
            where: { email: emailNormalizado }
        });

        if (!cliente) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha inválidos.'
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha inválidos.'
            });
        }

        const token = criarToken(cliente);
        configurarCookie(res, token);

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            cliente: {
                id: cliente.id,
                nome: cliente.nome,
                telefone: cliente.telefone,
                email: cliente.email
            }
        });

    } catch (erro) {
        console.error('Erro no login:', erro);

        return res.status(500).json({
            mensagem: 'Erro ao realizar login.'
        });
    }
}


async function perfil(req, res) {
    try {
        const cliente = await prisma.cliente.findUnique({
            where: { id: req.clienteId },
            select: {
                id: true,
                nome: true,
                telefone: true,
                email: true
            }
        });

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado.'
            });
        }

        return res.json({ cliente });

    } catch (erro) {
        console.error('Erro ao consultar perfil:', erro);

        return res.status(500).json({
            mensagem: 'Erro ao consultar perfil.'
        });
    }
}


function logout(req, res) {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });

    return res.json({
        mensagem: 'Logout realizado.'
    });
}

module.exports = {
    cadastrar,
    login,
    perfil,
    logout
};