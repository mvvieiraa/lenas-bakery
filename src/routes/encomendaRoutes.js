
const express = require('express');
const router = express.Router();

const encomendaController = require('../controllers/encomendaController');

// POST - Criar encomenda
router.post('/encomendas', encomendaController.criarEncomenda);

// GET - Listar todas as encomendas
router.get('/encomendas', encomendaController.listarEncomendas);

// GET - Buscar encomenda por ID
router.get('/encomendas/:id', encomendaController.buscarEncomendaPorId);

// PUT - Atualizar encomenda
router.put('/encomendas/:id', encomendaController.atualizarEncomenda);

// DELETE - Excluir encomenda
router.delete('/encomendas/:id', encomendaController.apagarEncomenda);

module.exports = router;
