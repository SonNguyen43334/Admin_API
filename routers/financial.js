const { getAllFinancial, getFinancebyId, addFinance } = require('../controllers/financialController');

const router = require('express').Router();

//FIND FINANCE
router.get('/api/admin/financial-report/', getAllFinancial);
//FIND FINANCE
router.get('/api/admin/financial-report/:reportId', getFinancebyId);
//ADD FINANCE
router.post('/api/admin/financial-report', addFinance);

module.exports = router;