const prisma = require('../prisma');


async function criarEncomenda(req, res) {
    try {
        const {
            produto,
            quantidade,
            observacoes,
            dataEntrega
        } = req.body;

        if (!produto || !quantidade || Number(quantidade) < 1) {
            return res.status(400).json({
                mensagem: 'Informe o produto e uma quantidade válida.'
            });
        }

        const novaEncomenda = await prisma.encomenda.create({
            data: {
                produto,
                quantidade: Number(quantidade),
                observacoes: observacoes || null,
                dataEntrega: dataEntrega
                    ? new Date(dataEntrega)
                    : null,
                clienteId: req.clienteId
            }
        });

        return res.status(201).json(novaEncomenda);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao criar encomenda.'
        });
    }
}


async function listarEncomendas(req, res) {
    try {
        const encomendas = await prisma.encomenda.findMany({
            where: {
                clienteId: req.clienteId
            }
        });

        return res.status(200).json(encomendas);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao listar encomendas.'
        });
    }
}


async function buscarEncomendaPorId(req, res) {
    try {
        const id = Number(req.params.id);

        const encomenda = await prisma.encomenda.findFirst({
            where: {
                id,
                clienteId: req.clienteId
            }
        });

        if (!encomenda) {
            return res.status(404).json({
                mensagem: 'Encomenda não encontrada.'
            });
        }

        return res.status(200).json(encomenda);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao buscar encomenda.'
        });
    }
}

// 4. UPDATE - Atualizar encomenda
async function atualizarEncomenda(req, res) {
    try {
        const id = Number(req.params.id);

        const encomendaExistente = await prisma.encomenda.findFirst({
            where: {
                id,
                clienteId: req.clienteId
            }
        });

        if (!encomendaExistente) {
            return res.status(404).json({
                mensagem: 'Encomenda não encontrada.'
            });
        }

        const {
            produto,
            quantidade,
            observacoes,
            dataEntrega
        } = req.body;

        const encomendaAtualizada = await prisma.encomenda.update({
            where: {
                id
            },
            data: {
                produto: produto ?? undefined,
                quantidade: quantidade !== undefined
                    ? Number(quantidade)
                    : undefined,
                observacoes: observacoes ?? undefined,
                dataEntrega: dataEntrega
                    ? new Date(dataEntrega)
                    : undefined
            }
        });

        return res.status(200).json(encomendaAtualizada);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao atualizar encomenda.'
        });
    }
}


async function apagarEncomenda(req, res) {
    try {
        const id = Number(req.params.id);

        const encomendaExistente = await prisma.encomenda.findFirst({
            where: {
                id,
                clienteId: req.clienteId
            }
        });

        if (!encomendaExistente) {
            return res.status(404).json({
                mensagem: 'Encomenda não encontrada.'
            });
        }

        await prisma.encomenda.delete({
            where: {
                id
            }
        });

        return res.status(204).send();

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao excluir encomenda.'
        });
    }
}

module.exports = {
    criarEncomenda,
    listarEncomendas,
    buscarEncomendaPorId,
    atualizarEncomenda,
    apagarEncomenda
};