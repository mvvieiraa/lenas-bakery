const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const token = req.cookies?.lenas_token;

    if (!token) {
        return res.status(401).json({
            mensagem: 'Você precisa entrar na sua conta para continuar.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.clienteId = decoded.id;

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Sessão inválida ou expirada. Faça login novamente.'
        });
    }
}

module.exports = autenticar;