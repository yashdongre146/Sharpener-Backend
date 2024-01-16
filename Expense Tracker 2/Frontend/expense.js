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

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const decodedToken = parseJwt(token);

        if (decodedToken.isPremiumUser) {
            document.getElementById('rzp-button').style.display = "none"
            document.getElementById('isPremium').style.display = "block"
        }

        const expenses = await axios.get('http://localhost:3000/getExpense', {headers: {'auth': token}});

        for (let i = 0; i < expenses.data.length; i++) {
            showUserOnScreen(expenses.data[i]);
        }
    } catch (err) {
        console.log(err);
    }
})

async function addExpense(e){
    try {
        e.preventDefault();
        const expenseDetails = {
            amount: expenseAmount.value,
            description: chooseDescription.value,
            category: selectCategory.value
        }

        await axios.post('http://localhost:3000/addExpense', expenseDetails, {headers: {'auth': token}});
        alert("Successfully added.");
        location.reload('/');
    } catch (err) {
        console.log(err);
    }
}

async function deleteExpense(expenseId) {
    try {
        await axios.delete(`http://localhost:3000/deleteExpense/${expenseId}`, {headers: {'auth': token}})
        alert("Expense deleted")
        location.reload('/')
    } catch (err) {
        console.log(err);
    }
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
document.getElementById('rzp-button').addEventListener('click', async () => {
    try {
      const purchaseResponse = await axios.get('http://localhost:3000/purchase', { headers: { "auth": token } });
      const options = {
        "key": purchaseResponse.data.key_id,
        "order_id": purchaseResponse.data.order.id,
        "handler": async (res) => {
          try {
            const updateResponse = await axios.post('http://localhost:3000/updateTransactionStatus', {
                order_id: options.order_id,
                payment_id: res.razorpay_payment_id
            }, { headers: { "auth": token } });

            alert("Congrats! you are a premium member now.");
            document.getElementById('rzp-button').style.display = "none";
            document.getElementById('isPremium').style.display = "block";
            localStorage.setItem('token', updateResponse.data.token);
          } catch (error) {
            console.error(error);
            alert("Something went wrong");
          }
        }
      };
  
      const rzp = new Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', (res) => {
        console.log(res);
        alert("Something went wrong");
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
});

document.getElementById('showLeaderboard').addEventListener('click', async () => {
    try {
      const res = await axios.get('http://localhost:3000/showLeaderboard', { headers: { "auth": token } });
      
      const ul = document.getElementById('leaderboard');
      res.data.forEach((result) => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`Name ${result.name}, Total Expense ${result.totalAmount}`));
        ul.appendChild(li);
      });
    } catch (error) {
      console.error(error);
    }
});
document.getElementById('showHistory').addEventListener('click', async () => {
    try {
      const res = await axios.get('http://localhost:3000/showHistory', { headers: { "auth": token } });

      const table = document.getElementById('table');
      const caption = document.createElement('caption');
      caption.appendChild(document.createTextNode("Show History"))

      for (const file of res.data) {
        // converting into local date string
        const newDate = new Date(file.updatedAt);
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
      
        const formattedDate = newDate.toLocaleDateString('en-US', options);
      
        const a = document.createElement('a');
        a.appendChild(document.createTextNode(formattedDate));
        a.href = file.fileUrl;
        a.download = formattedDate;
      
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        
        td.appendChild(a);
        tr.appendChild(td);
        table.appendChild(caption);
        table.appendChild(tr);
      }
      

    } catch (error) {
      alert("Something went wrong")
    }
});
document.getElementById('download').addEventListener('click', async () => {
  try {
    const res = await axios.get('http://localhost:3000/download', {
        headers: { "auth": token }
    });

    const a = document.createElement('a');
    a.href = res.data.fileUrl;
    a.download = 'myExpenses.csv';

    a.click();
  } catch (err) {
    alert("Something went wrong!")
  }
});