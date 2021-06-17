let router = require('express').Router();
const controller = require('../controllers/agendamentos-controller-pg');

router.get('/', controller.listarPg);
router.get('/:id', controller.listarPorIdPg);
router.post('/', controller.adicionarPg);
router.put('/:id', controller.atualizarPg);
router.delete('/:id', controller.removerPg);

module.exports = router;