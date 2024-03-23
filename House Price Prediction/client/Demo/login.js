document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const loginUsername = document.getElementById("loginUsername").value;
        const loginPassword = document.getElementById("loginPassword").value;

        const storedPassword = localStorage.getItem(loginUsername);

        if (loginPassword === storedPassword) {
            window.location.href = "/root/AG5/House Price Prediction/client/Demo/app/index.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    });
});
