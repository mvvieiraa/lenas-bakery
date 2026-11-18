
function validarDados(req, res, next) {
    console.log('VALIDAR DADOS EXECUTADO');
}

function validarDados(req, res, next) {
    const {
        produto,
        quantidade,
        observacoes,
        clienteId
    } = req.body;

    // Validar o produto
    if (
        !produto ||
        typeof produto !== 'string' ||
        produto.trim().length < 3
    ) {
        return res.status(400).json({
            erro: 'O produto é obrigatório e deve ter pelo menos 3 caracteres.'
        });
    }

    // Validar a quantidade
    const quantidadeNumerica = Number(quantidade);

    if (
        quantidade === undefined ||
        quantidade === null ||
        !Number.isInteger(quantidadeNumerica) ||
        quantidadeNumerica <= 0
    ) {
        return res.status(400).json({
            erro: 'A quantidade deve ser um número inteiro positivo.'
        });
    }

    // Validar o cliente no cadastro
    if (req.method === 'POST') {
        const idNumerico = Number(clienteId);

        if (
            clienteId === undefined ||
            clienteId === null ||
            clienteId === '' ||
            !Number.isInteger(idNumerico) ||
            idNumerico <= 0
        ) {
            return res.status(400).json({
                erro: 'O clienteId é obrigatório e deve ser um número inteiro positivo.'
            });
        }

        req.body.clienteId = idNumerico;
    }

    // Sanitizar os dados
    req.body.produto = produto.trim();

    if (typeof observacoes === 'string') {
        req.body.observacoes = observacoes.trim();
    }

    req.body.quantidade = quantidadeNumerica;

    next();
}

module.exports = validarDados;
