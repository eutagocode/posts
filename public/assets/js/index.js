const posts = document.getElementById("posts");
const addPostInput = document.getElementById("addPostInput");
const postsCounter = document.getElementById("postsCounter");
const addPostButton = document.getElementById("addPostButton");

const createPost = (text, id) => {
    const date = new Date();
    let month = date.getMonth();

    if (
        month == 1 ||
        month == 2 ||
        month == 3 ||
        month == 4 ||
        month == 5 ||
        month == 6 ||
        month == 7 ||
        month == 8 ||
        month == 9
    ) {
        month = `0${date.getMonth() + 1}`;
    }

    return `<article id="${id}" class="post"><header class="post-header"><div class="info-post"><img src="./assets/docs/images/user.svg"alt="imagem de usuário"/><p>Thiago Luiz</p><p>-</p><p class="date">${date.getDate()}/${month}/${date.getFullYear()}</p></div><div class="actions"><button onclick="editPost(this)" class="edit-post-button">Editar</button><button onclick="deletePost(this)" class="delete-post-button">Apagar</button></div></header><hr /><p class="post-text">${text}</p></article>`;
};

window.addEventListener("DOMContentLoaded", async () => {
    const api = "http://localhost:9000/api/posts/";
    try {
        const response = await fetch(api);
        const json = await response.json();
        const data = JSON.parse(json);
        let allPosts = "";

        data.map((post) => {
            allPosts += createPost(post.text, post.id);
        });

        postsCounter.innerHTML = data.length;
        posts.innerHTML = allPosts;
    } catch (error) {
        throw new Error("Ops, algo deu errado!");
    }
});

addPostButton.addEventListener("click", async () => {
    try {
        if (addPostInput == "") return;

        const post = { text: addPostInput.value };

        const api = "http://localhost:9000/api/posts/new";
        await fetch(api, {
            method: "post",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify(post),
        });
        getPosts();

        addPostInput.value = "";
    } catch (error) {
        throw new Error("Ops, algo deu errado!");
    }
});

const editPost = (element) => {
    console.log(element);
};

const deletePost = (element) => {
    console.log(element);
};
