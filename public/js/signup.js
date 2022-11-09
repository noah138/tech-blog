const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const userObj = {
        username: document.querySelector("#username-input-signup").value,
        password : document.querySelector("#password-input-signup").value
    }

    fetch("/api/user/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type" : "application/json"
        }
    }).then (res => {
        if (res.ok) {
            document.location.replace("/dashboard")
        } else {
            alert("Signup failed")
        }
    })
})