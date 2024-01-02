const expenseAmount = document.getElementById('expenseamount');
const chooseDescription = document.getElementById('choosedescription');
const selectCategory = document.getElementById('selectcategory');
const form = document.getElementById('form');
const items = document.getElementById('items');
const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/getExpense', {headers: {'auth': token}}).then((expenses)=>{
        for (let i = 0; i < expenses.data.length; i++) {
            showUserOnScreen(expenses.data[i]);
        }
    })
})

function addExpense(e){
    e.preventDefault();
    const expense = {
        amount: expenseAmount.value,
        description: chooseDescription.value,
        category: selectCategory.value
    }

    axios.post('http://localhost:3000/addExpense', expense, {headers: {'auth': token}}).then((expense)=>{
        alert("Successfully added.");
        location.reload('/')
    })
}

function deleteExpense(expenseId) {
    axios.delete(`http://localhost:3000/deleteExpense/${expenseId}`).then((res)=>{
        alert("Expense deleted")
        location.reload('/')
    })
}

function showUserOnScreen(expense){
    const ul = document.getElementById('list');
    const li = document.createElement('li');

    li.appendChild(document.createTextNode(`${expense.amount} - ${expense.description} - ${expense.category} `));

    // adding a delete button
    const del = document.createElement('button');
    del.appendChild(document.createTextNode('Delete Expense'));

    li.appendChild(del);
    ul.appendChild(li);

    del.addEventListener('click', () => deleteExpense(expense.id));
    del.addEventListener('click', deleteExpenseFromScreen);

    function deleteExpenseFromScreen(){
        ul.remove(li);
    }
}