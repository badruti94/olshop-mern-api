const router = require('express').Router();
const pembelian = require('../../controllers/user/pembelian');

router.post('/', pembelian.beli);
router.get('/bayar/:id', pembelian.bayar);
router.get('/terima/:id', pembelian.terima);

module.exports = router;
