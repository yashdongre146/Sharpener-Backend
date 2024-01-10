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

    const loginDetails = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    axios.post(`http://localhost:3000/login`, loginDetails)
        .then((res) => {
                console.log(res.data.token);
                localStorage.setItem('token', res.data.token)
                window.location.href = 'expense.html';
        }).catch((err)=>{
            if(err){
                alert("Invalid credentials")
            }
        })
}
async function forgotPassword(e) {
    e.preventDefault();
    const forgotEmail = document.getElementById('forgot-email');
    
    try {
        await axios.post('http://localhost:3000/forgotPassword', { forgotEmail: forgotEmail.value });
        alert('Email sent.');
        window.location.href = 'login.html';
    } catch (err) {
        if (err.response && err.response.status === 401) {
            alert('Email not found.');
        } else if (err.response && err.response.status === 500) {
            alert('Something went wrong.');
        } else {
            alert('An error occurred.');
        }
    }
}

function toogleForm(e) {
    e.preventDefault();
    document.getElementById('forgotForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementsByTagName('a')[0].style.display = 'block';
    document.getElementsByTagName('a')[1].style.display = 'none';
    document.getElementsByTagName('a')[2].style.display = 'none';
}