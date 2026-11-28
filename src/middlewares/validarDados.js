
function validarDados(req, res, next) {

    const {
        produto,
        quantidade,
        observacoes,
        dataEntrega
    } = req.body;


    if (req.method === 'POST') {

        if (
            !produto ||
            typeof produto !== 'string' ||
            produto.trim().length < 3
        ) {
            return res.status(400).json({
                mensagem: 'O produto deve ter pelo menos 3 caracteres.'
            });
        }

        const quantidadeNumerica = Number(quantidade);

        if (
            quantidade === undefined ||
            quantidade === null ||
            !Number.isInteger(quantidadeNumerica) ||
            quantidadeNumerica <= 0
        ) {
            return res.status(400).json({
                mensagem: 'A quantidade deve ser um número inteiro positivo.'
            });
        }

        req.body.produto = produto.trim();
        req.body.quantidade = quantidadeNumerica;
    }

   
    if (req.method === 'PUT') {

        if (produto !== undefined) {

            if (
                typeof produto !== 'string' ||
                produto.trim().length < 3
            ) {
                return res.status(400).json({
                    mensagem: 'O produto deve ter pelo menos 3 caracteres.'
                });
            }

            req.body.produto = produto.trim();
        }

     
        if (quantidade !== undefined) {

            const quantidadeNumerica = Number(quantidade);

            if (
                !Number.isInteger(quantidadeNumerica) ||
                quantidadeNumerica <= 0
            ) {
                return res.status(400).json({
                    mensagem: 'A quantidade deve ser um número inteiro positivo.'
                });
            }

            req.body.quantidade = quantidadeNumerica;
        }

        if (
            produto === undefined &&
            quantidade === undefined &&
            observacoes === undefined &&
            dataEntrega === undefined
        ) {
            return res.status(400).json({
                mensagem: 'Informe pelo menos um dado para atualizar.'
            });
        }
    }

  
    if (typeof observacoes === 'string') {
        req.body.observacoes = observacoes.trim();
    }


    if (dataEntrega !== undefined && dataEntrega !== null && dataEntrega !== '') {

        const dataValida = new Date(dataEntrega);

        if (isNaN(dataValida.getTime())) {
            return res.status(400).json({
                mensagem: 'A data de entrega é inválida.'
            });
        }

        req.body.dataEntrega = dataValida.toISOString();
    }

    next();
}

module.exports = validarDados;
