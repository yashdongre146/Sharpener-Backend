const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');

function saveToDatabase(e) {
    e.preventDefault();
    const userDetails = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    axios.post('http://localhost:3000/addUser', userDetails)
        .then((res) => {
            // Handle success if needed (when HTTP status is not an error)
        })
        .catch((err) => {
            if (err.response) {
                alert(err.response.data); // Access the error response data
            }
        });
}
