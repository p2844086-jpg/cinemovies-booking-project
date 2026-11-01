
document.addEventListener("DOMContentLoaded", function () {

    // Get saved users from localStorage
    let users = JSON.parse(localStorage.getItem("cinebookUsers")) || [];

    // =========================
    // SIGNUP
    // =========================

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password.length < 8) {
                alert("Password must contain at least 8 characters.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                alert("This email is already registered. Please login.");
                return;
            }

            const newUser = {
                name: name,
                email: email,
                phone: phone,
                password: password
            };

            users.push(newUser);

            localStorage.setItem("cinebookUsers", JSON.stringify(users));

            alert("Signup successful! Please login.");

            window.location.href = "./login.html";
        });
    }

    // =========================
    // LOGIN
    // =========================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim().toLowerCase();
            const password = document.getElementById("loginPassword").value;

            const savedUsers = JSON.parse(localStorage.getItem("cinebookUsers")) || [];

            const validUser = savedUsers.find(user =>
                user.email === email && user.password === password
            );

            if (validUser) {
                localStorage.setItem("loggedInUser", JSON.stringify({
                    name: validUser.name,
                    email: validUser.email
                }));

                alert("Login successful! Welcome to CineBook.");

                window.location.href = "./movies.html";
            } else {
                alert("Invalid email or password!");
            }
        });
    }

    // =========================
    // SHOW / HIDE PASSWORD
    // =========================

    const showPassword = document.getElementById("showPassword");
    const loginPassword = document.getElementById("loginPassword");

    if (showPassword && loginPassword) {
        showPassword.addEventListener("change", function () {
            loginPassword.type = this.checked ? "text" : "password";
        });
    }

    // =========================
    // PROTECT MOVIES PAGE
    // =========================

    if (window.location.pathname.endsWith("movies.html")) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser) {
            alert("Please login first.");
            window.location.href = "./login.html";
            return;
        }

        const welcomeMessage = document.getElementById("welcomeMessage");

        if (welcomeMessage) {
            welcomeMessage.textContent = "Welcome, " + loggedInUser.name + "!";
        }
    }

    // =========================
    // LOGOUT
    // =========================

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            alert("You have logged out successfully.");
            window.location.href = "./index.html";
        });
    }

});

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const showPassword = document.getElementById("showPassword");
    const passwordInput = document.getElementById("loginPassword");

    // SHOW / HIDE PASSWORD

    if (showPassword && passwordInput) {
        showPassword.addEventListener("change", function () {
            passwordInput.type = this.checked ? "text" : "password";
        });
    }

    // LOGIN FUNCTION

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("loginEmail")
                .value.trim().toLowerCase();

            const password = passwordInput.value;

            const users = JSON.parse(
                localStorage.getItem("cinebookUsers") || "[]"
            );

            const user = users.find(function (item) {
                return item.email === email &&
                       item.password === password;
            });

            if (user) {

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify({
                        name: user.name,
                        email: user.email
                    })
                );

                alert("Login Successful! Welcome " + user.name);

                window.location.href = "./movies.html";

            } else {

                alert("Invalid Email or Password!");

            }
        });
    }

});
