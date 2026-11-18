
const express = require('express');
const router = express.Router();

const encomendaController = require('../controllers/encomendaController');

// Importar middlewares
const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');

// POST - Criar encomenda
router.post(
    '/encomendas',
    validarDados,
    encomendaController.criarEncomenda
);

// GET - Listar todas as encomendas
router.get(
    '/encomendas',
    encomendaController.listarEncomendas
);

// GET - Buscar encomenda por ID
router.get(
    '/encomendas/:id',
    validarId,
    encomendaController.buscarEncomendaPorId
);

// PUT - Atualizar encomenda
router.put(
    '/encomendas/:id',
    validarId,
    validarDados,
    encomendaController.atualizarEncomenda
);

// DELETE - Excluir encomenda
router.delete(
    '/encomendas/:id',
    validarId,
    encomendaController.apagarEncomenda
);

module.exports = router;
