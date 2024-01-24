const { addAccount, getAllAccounts, getAccountbyId, updateAccountbyId, deleteAccount } = require('../controllers/accountController');

const router = require('express').Router();

//ADD ACCOUNT
router.post('/api/admin/accounts/', addAccount);
//FIND ACCOUNT
router.get('/api/admin/accounts/', getAllAccounts);
//FIND ACCOUNT BY ID
router.get('/api/admin/accounts/:userId', getAccountbyId);
//UPDATE ACCOUNT
router.put('/api/admin/accounts/:userId', updateAccountbyId);
//DELETE ACCOUNT
router.delete('/api/admin/accounts/:userId', deleteAccount);

module.exports = router;