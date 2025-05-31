const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middlewares/auth');

router.get('/', auth, companyController.getAll);
router.post('/', auth, companyController.create);
router.get('/:id', auth, companyController.getById);
router.put('/:id', auth, companyController.update);
router.delete('/:id', auth, companyController.remove);

module.exports = router;
