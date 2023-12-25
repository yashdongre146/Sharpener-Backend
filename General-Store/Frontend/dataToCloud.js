let name = document.getElementById('iname');
let email = document.getElementById('description');
let number = document.getElementById('price');
let quantity = document.getElementById('quantity');

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/admin/getUsers')
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                console.log(res.data[i]);
                showUserOnScreen(res.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
})

function saveToDatabase() {
    const userDetails = {
        itemName: name.value,
        description: email.value,
        price: number.value,
        quantity: quantity.value,
    }
    axios.post('http://localhost:3000/add-user', userDetails)
        .then((res) => {
            console.log(res);
            showUserOnScreen(res.data);
            location.reload();
        })
        .catch((err) => {
            alert(err);
        })
}

function decreaseQuantity(dataId, quantity) {
    axios.post(`http://localhost:3000/admin/decreaseQuantity/${dataId}/${quantity}`)
        .then((res) => {
            console.log(res);
            showUserOnScreen(res.data);
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
}

function showUserOnScreen(data) {
    let ul = document.createElement('ul');
    let body = document.querySelector('.bg-img');
    let li = document.createElement('li');
    li.className = 'list-group-item';

    let details = document.createTextNode(`${data.itemName} - ${data.description} - ${data.price} - ${data.quantity}`);
    li.appendChild(details);
    ul.appendChild(li);
    body.appendChild(ul);

    //adding edit button
    let buy1 = document.createElement('button');
    buy1.appendChild(document.createTextNode('buy1'));
    li.appendChild(buy1);
    //adding edit button
    let buy2 = document.createElement('button');
    buy2.appendChild(document.createTextNode('buy2'));
    li.appendChild(buy2);
    //adding edit button
    let buy3 = document.createElement('button');
    buy3.appendChild(document.createTextNode('buy3'));
    li.appendChild(buy3);

    // event for delete button
    buy1.addEventListener('click', () => decreaseQuantity(data.id, 1));
    buy2.addEventListener('click', () => decreaseQuantity(data.id, 2));
    buy3.addEventListener('click', () => decreaseQuantity(data.id, 3));
}

