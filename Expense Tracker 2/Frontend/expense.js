const expenseAmount = document.getElementById('expenseamount');
const chooseDescription = document.getElementById('choosedescription');
const selectCategory = document.getElementById('selectcategory');
const form = document.getElementById('form');
const items = document.getElementById('items');
const token = localStorage.getItem('token');

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded', () => {
    const decodedToken = parseJwt(token);
    if (decodedToken.isPremiumUser) {
        document.getElementById('rzp-button').style.display = "none"
        document.getElementById('isPremium').style.display = "block"
    }
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

document.getElementById('rzp-button').addEventListener('click', ()=>{
    axios.get('http://localhost:3000/purchase', {headers: {"auth": token}})
    .then((res)=>{
        var options = {
            "key": res.data.key_id,
            "order_id": res.data.order.id,
            "handler": function(res){
                axios.post('http://localhost:3000/updateTransactionStatus', {
                    order_id: options.order_id,
                    payment_id: res.razorpay_payment_id
                }, {headers: {"auth": token}}).then((res)=>{
                    alert("Congrats! you are a premium member now.")
                    document.getElementById('rzp-button').style.display = "none"
                    document.getElementById('isPremium').style.display = "block"
                    localStorage.setItem('token', res.data.token)
                })
            }
        }

        const rzp1 = new Razorpay(options);
        rzp1.open();

        rzp1.on('payment.faild', function(res){
            console.log(res);
            alert("something went wrong");
        })
    })
})
document.getElementById('showLeaderboard').addEventListener('click', ()=>{
    axios.get('http://localhost:3000/showLeaderboard', {headers: {"auth": token}})
    .then((res)=>{
        res.data.forEach((result)=>{
            const ul = document.getElementById('leaderboard');
            const li = document.createElement('li');

            li.appendChild(document.createTextNode(`Name ${result.name}, Total Expense ${result.totalAmountSpent}`));

            ul.appendChild(li);
        })
    })
})