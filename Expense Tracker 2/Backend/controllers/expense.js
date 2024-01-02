const Expense = require("../models/expense")
const User = require("../models/user")

exports.addExpense = (req, res) => {
    const {amount, description, category} = req.body;
    Expense.create({
        amount: amount,
        description: description,
        category: category,
        userId: req.user.id
    }).then(expense=>res.json(expense))
}

exports.getExpense = (req, res) => {
    Expense.findAll({where: {userId: req.user.id}}).then(expenses=>{
        res.json(expenses)
    })
}

exports.deleteExpense = (req, res) => {
    Expense.destroy({where: {id: req.params.expenseId}}).then(()=>{
        res.json();
    })
}