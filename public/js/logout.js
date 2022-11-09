async function logout() {
    const res = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        }
    })

    if (res.ok) {
        document.location.replace("/")
        alert("Logged out")
    } else {
        alert("Logout failed")
    }
}

document.querySelector("#logout").addEventListener("click", logout)