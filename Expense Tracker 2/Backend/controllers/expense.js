const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.addExpense = (req, res) => {
  const { amount, description, category } = req.body;
  Expense.create({
    amount: amount,
    description: description,
    category: category,
    userId: req.user.id,
  }).then((expense) => res.json(expense));
};

exports.getExpense = (req, res) => {
  Expense.findAll({ where: { userId: req.user.id } }).then((expenses) => {
    res.json(expenses);
  });
};

exports.deleteExpense = (req, res) => {
  Expense.destroy({ where: { id: req.params.expenseId } }).then(() => {
    res.json();
  });
};
exports.showLeaderboard = async (req, res) => {
  /*    

Promise.all([Expense.findAll(), User.findAll()]).then(([expenses, users]) => {
        const totalAmounts = {};

        // Calculate total amounts spent by each user
        expenses.forEach((expense) => {
            const userId = expense.dataValues.userId;
            const amount = expense.dataValues.amount;

            if (!totalAmounts[userId]) {
                totalAmounts[userId] = amount;
            } else {
                totalAmounts[userId] += amount;
            }
        });

        // Create an array of objects combining user data with total amount spent
        const result = users.map((user) => ({
            id: user.dataValues.id,
            name: user.dataValues.name,
            totalAmountSpent: totalAmounts[user.dataValues.id] || 0 // Use the total amount or 0 if not found
            // Here, you'd typically use totalAmounts[user.id] but considering your data structure, it might need adjustment based on your actual data
        }));

        res.json(result); // Display the ultimate result
    });

*/
  const result = await User.findAll({
    attributes: [
      "id",
      "name",
      [sequelize.fn("sum", sequelize.col("amount")), "totalAmountSpent"],
    ],
    include: [
      {
        model: Expense,
        attributes: [],
      },
    ],
    group: ["id"],
    order: [["totalAmountSpent", "DESC"]],
  });

  res.json(result);
};
