async function editPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value
    const body = document.querySelector('input[name="post-body"]').value
    const id = document.querySelector('input[name="post-id"]').value

    const res = await fetch(`/api/post/${id}`, {
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
        alert("Failed to update post")
    }

    document.location.replace("/dashboard")
}

async function deletePostHandler() {
    await fetch(`/api/post/${id}`, {
        method: "DELETE",
    })

    document.location.replace("/dashboard")
}

document.querySelector("#edit-post-form").addEventListener("submit", editPostHandler)
document.querySelector("#delete-btn").addEventListener("click", deletePostHandler)