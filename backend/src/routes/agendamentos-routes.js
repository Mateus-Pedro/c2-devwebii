let router = require('express').Router();
const controller = require('../controllers/agendamentos-controller');

router.get('/', controller.listar);
router.get('/:id', controller.listarPorId);
router.post('/', controller.adicionar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);

module.exports = router;