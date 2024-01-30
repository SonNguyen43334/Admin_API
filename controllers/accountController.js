const {Account} = require('../modules/module');

const AccountController = {
    addAccount: async (req, res) => {
        // res.status(200).json(req.body);
        const existingAccount = await Account.findOne({ userName : req.body.userName });
        if (existingAccount){
            return res.status(400).json({ error: 'UserName already exists, please try another!'});
        }
        try {
            const newAccount = new Account(req.body);
            const savedAccount = await newAccount.save();
            res.status(200).json(savedAccount);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllAccounts: async (req, res) => {
        try {
            const Accounts = await Account.find();
            res.status(200).json(Accounts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAccountbyId: async (req, res) => {
        const userId = req.params.userId;
        try {
            const account = await Account.findOne({ userID: userId });
            if (account) {
                res.status(200).json(account);
            } else {
                res.status(404).json({ message: 'Account not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateAccountbyId: async (req, res) => {
        const userId = req.params.userId;
        const updateData = req.body;
        try {
            const updatedAccount = await Account.findOneAndUpdate(
                { userID: userId },
                updateData,
                { new: true } // Trả về tài khoản đã được cập nhật
            );
            if (updatedAccount) {
                res.status(200).json(updatedAccount);
            } else {
                res.status(404).json({ message: 'Account not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAccount: async (req, res) => {
        const userId = req.params.userId;
        try {
            const deletedAccount = await Account.findOneAndDelete({ userID: userId });

            if (deletedAccount) {
                res.status(200).json({ message: 'Account deleted successfully' });
            } else {
                res.status(404).json({ message: 'Account not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = AccountController;