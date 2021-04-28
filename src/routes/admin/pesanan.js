const router = require('express').Router();
const pesanan = require('../../controllers/admin/pesanan');

router.get('/', pesanan.getAll);
router.get('/kirim/:id', pesanan.kirim);

module.exports = router;
