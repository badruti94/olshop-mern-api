const router = require('express').Router();
const user = require('../../controllers/admin/user');
const { adminAuth } = require('../../middleware/auth');

router.use(adminAuth);
router.get('/', user.getAllUser);

module.exports = router;
