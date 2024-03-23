document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Simple validation to check if fields are not empty
        if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
            alert("Please fill in all fields.");
            return;
        }

        // Validate email format using a regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if password meets minimum length requirement
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // Store data in localStorage
        localStorage.setItem(username, JSON.stringify({ email: email, password: password }));

        // Redirect to login page
        window.location.href = "./login.html";
    });
});

