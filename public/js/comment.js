async function commentFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector('input[name="post-id"]').value
    const comment = document.querySelector('input[name="comment-body"]').value

    if(commentText) {
       const res = await fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify({
            id,
            comment
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    })
        if (res.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

document.quertSelector('#new-comment-form').addEventListener("submit", commentFormHandler)