let router = require('express').Router();
const controllerr = require('../controllers/pessoas-controller')

router.get('/', controllerr.listar);
router.get('/:id', controllerr.listarPorID);
router.post('/', controllerr.adicionar);
router.put('/:id', controllerr.atualizar);
router.delete('/:id', controllerr.remover);

module.exports = router;