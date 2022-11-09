const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const userObj = {
        username: document.querySelector("#username-input-signup").value,
        password : document.querySelector("#password-input-signup").value
    }

    fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type" : "application/json"
        }
    }).then (res => {
        if (res.ok) {
            document.location.replace("/dashboard")
        } else {
            alert("Login failed")
        }
    })
})