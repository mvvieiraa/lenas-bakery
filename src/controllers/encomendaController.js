
const prisma = require('../prisma');

// 1. CREATE - Criar encomenda
async function criarEncomenda(req, res) {
    try {
        const {
            produto,
            quantidade,
            observacoes,
            status,
            clienteId
        } = req.body;

        const novaEncomenda = await prisma.encomenda.create({
            data: {
                produto,
                quantidade: Number(quantidade),
                observacoes,
                status,
                clienteId: Number(clienteId)
            },
            include: {
                cliente: true
            }
        });

        return res.status(201).json(novaEncomenda);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao criar encomenda."
        });
    }
}

// 2. READ - Listar todas as encomendas
async function listarEncomendas(req, res) {
    try {
        const encomendas = await prisma.encomenda.findMany({
            include: {
                cliente: true
            }
        });

        return res.status(200).json(encomendas);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao listar encomendas."
        });
    }
}

// 3. READ - Buscar encomenda por ID
async function buscarEncomendaPorId(req, res) {
    try {
        const { id } = req.params;

        const encomenda = await prisma.encomenda.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                cliente: true
            }
        });

        if (!encomenda) {
            return res.status(404).json({
                erro: "Encomenda não encontrada."
            });
        }

        return res.status(200).json(encomenda);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao buscar encomenda."
        });
    }
}

// 4. UPDATE - Atualizar encomenda
async function atualizarEncomenda(req, res) {
    try {
        const { id } = req.params;

        const {
            produto,
            quantidade,
            observacoes,
            status
        } = req.body;

        const encomendaAtualizada = await prisma.encomenda.update({
            where: {
                id: Number(id)
            },
            data: {
                produto,
                quantidade: quantidade !== undefined
                    ? Number(quantidade)
                    : undefined,
                observacoes,
                status
            },
            include: {
                cliente: true
            }
        });

        return res.status(200).json(encomendaAtualizada);

    } catch (erro) {
        console.error(erro);
        return res.status(404).json({
            erro: "Encomenda não encontrada para atualização."
        });
    }
}

// 5. DELETE - Excluir encomenda
async function apagarEncomenda(req, res) {
    try {
        const { id } = req.params;

        await prisma.encomenda.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(204).send();

    } catch (erro) {
        console.error(erro);
        return res.status(404).json({
            erro: "Encomenda não encontrada para exclusão."
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
