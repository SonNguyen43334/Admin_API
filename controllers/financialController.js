const {Finance} = require('../modules/module');

const FinancialController = {
    getAllFinancial: async (req, res) => {
        try {
            const Finances = await Finance.find();
            res.status(200).json(Finances);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getFinancebyId: async (req, res) => {
        const reportId = req.params.reportId;
        try {
            const finance = await Finance.findOne({ reportID: reportId });
            if (finance) {
                res.status(200).json(finance);
            } else {
                res.status(404).json({ message: 'Finance not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addFinance: async (req, res) => {
        // res.status(200).json(req.body);
        try {
            const newFinance = new Finance(req.body);
            const savedFinance = await newFinance.save();
            res.status(200).json(savedFinance);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = FinancialController;