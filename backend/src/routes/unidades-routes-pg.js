let router = require('express').Router();
const controller = require('../controllers/unidades-controller-pg')

router.post('/', controller.adicionarPg);
router.get('/', controller.listarPg);
router.get('/:id', controller.listarPorIdPg);
router.put('/:id', controller.atualizarPg);
router.delete('/:id', controller.removerPg);

module.exports = router;