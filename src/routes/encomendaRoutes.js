const express = require('express');
const router = express.Router();

const encomendaController = require('../controllers/encomendaController');

const validarDados = require('../middlewares/validarDados');
const validarId = require('../middlewares/validarId');
const autenticar = require('../middlewares/autenticar');


router.use(autenticar);


router.post(
    '/encomendas',
    validarDados,
    encomendaController.criarEncomenda
);


router.get(
    '/encomendas',
    encomendaController.listarEncomendas
);


router.get(
    '/encomendas/:id',
    validarId,
    encomendaController.buscarEncomendaPorId
);


router.put(
    '/encomendas/:id',
    validarId,
    validarDados,
    encomendaController.atualizarEncomenda
);


router.delete(
    '/encomendas/:id',
    validarId,
    encomendaController.apagarEncomenda
);

module.exports = router;