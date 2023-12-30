const Expense = require("../models/expense")

exports.addExpense = (req, res) => {
    Expense.create(req.body).then(expense=>res.json(expense))
}

exports.getExpense = (req, res) => {
    Expense.findAll().then(expenses=>res.json(expenses))
}

exports.deleteExpense = (req, res) => {
    Expense.destroy({where: {id: req.params.expenseId}}).then(()=>{
        res.json();
    })
}