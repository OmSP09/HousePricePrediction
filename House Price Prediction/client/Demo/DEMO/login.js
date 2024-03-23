document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const loginUsername = document.getElementById("email").value;
        const loginPassword = document.getElementById("password").value;

        const storedPassword = localStorage.getItem(loginUsername);

        if (loginPassword === storedPassword) {
            window.location.href = "./app/index.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    });
});
