const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

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
            document.getElementById('signupForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        })
        .catch((err) => {
            if (err) {
                alert("Email must be unique"); // Access the error response data
            }
        });
}
function checkLogin(e) {
    e.preventDefault();
    axios.get(`http://localhost:3000/checkUser/${loginEmail.value}/${loginPassword.value}`)
        .then((res) => {
                alert(`Welcome ${res.data[0].name}`);
        }).catch((err)=>{
            if(err){
                alert("Invalid credentials")
            }
        })
}
