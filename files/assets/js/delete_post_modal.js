function delete_postModal(id) {
    document.getElementById("deletePostButton").onclick =  function() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/delete_post/${id}`, true);
        xhr.setRequestHeader('xhr', 'xhr');
        var form = new FormData()
        form.append("formkey", formkey());
        xhr.onload = function() {
            let data
            try {data = JSON.parse(xhr.response)}
            catch(e) {console.log(e)}
            if (xhr.status >= 200 && xhr.status < 300 && data && data['message']) {
                document.getElementById(`post-${id}`).classList.add('deleted');
                document.getElementById(`delete-${id}`).classList.add('d-none');
                document.getElementById(`undelete-${id}`).classList.remove('d-none');
                document.getElementById(`delete2-${id}`).classList.add('d-none');
                document.getElementById(`undelete2-${id}`).classList.remove('d-none');
                document.getElementById('toast-post-success-text').innerText = data["message"];
                new bootstrap.Toast(document.getElementById('toast-post-success')).show();
            } else {
                document.getElementById('toast-post-error-text').innerText = "Error, please try again later."
                if (data && data["error"]) document.getElementById('toast-post-error-text').innerText = data["error"];
                new bootstrap.Toast(document.getElementById('toast-post-error')).show();
            }
        };
        xhr.send(form);
    };
}