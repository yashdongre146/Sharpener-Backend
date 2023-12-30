const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

function signup(e) {
    e.preventDefault();
    const userDetails = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    axios.post('http://localhost:3000/signup', userDetails)
        .then((res) => {
            window.location.href = 'login.html';
        })
        .catch((err) => {
            if (err) {
                alert("Email must be unique"); // Access the error response data
            }
        });
}
function login(e) {
    e.preventDefault();
    axios.get(`http://localhost:3000/login/${loginEmail.value}/${loginPassword.value}`)
        .then((res) => {
                alert(`Welcome ${res.data[0].name}`);
                window.location.href = 'expense.html';
        }).catch((err)=>{
            if(err){
                alert("Invalid credentials")
            }
        })
}