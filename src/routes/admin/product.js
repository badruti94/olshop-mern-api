const router = require('express').Router();
const product = require('../../controllers/admin/product');
const { adminAuth } = require('../../middleware/auth');

router.use(adminAuth);
router.get('/', product.getAll);
router.post('/', product.create);
router.put('/:id', product.update);
router.delete('/:id', product.delete);

module.exports = router;
