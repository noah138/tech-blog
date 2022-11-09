async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value
    const body = document.querySelector('input[name="post-body"]').value

    const res = await fetch(`/api/post/`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    })

    if (res.ok) {
        document.location.replace("/dashboard")
    } else {
        alert("Failed to create post")
    }
}

document.querySelector("#new-post-form").addEventListener("submit", newPostHandler)