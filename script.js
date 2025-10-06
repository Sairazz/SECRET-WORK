function checkPassword() {
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');
    const correctPassword = "YourSecret123"; // change this to your desired password

    if(password === correctPassword) {
        window.location.href = "dashboard.html";
    } else {
        error.textContent = "Incorrect password!";
    }
}
