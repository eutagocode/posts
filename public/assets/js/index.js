const posts = document.getElementById("all-posts");
const modal = document.getElementById("modal");
const inputTitle = document.getElementById("input-title");
const inputText = document.getElementById("input-text");

const showModal = () => {
    modal.style.display == "grid"
        ? (modal.style.display = "none")
        : (modal.style.display = "grid");
};

const createPost = (title, text, id) => {
    return `<article id="${id}" class="post"><header class="header-post"><h2 class="title">${title}</h2><nav><div class="dots"></div><div class="dots"></div><div class="dots"></div></nav></header><p class="text">${text}</p></article>`;
};

const getPosts = async () => {
    let allPosts = "";

    const response = await fetch("http://localhost:9000/api/posts");

    const json = await response.json();

    const data = JSON.parse(json);

    data.map((post) => {
        allPosts += createPost(post.title, post.text, post.id);
    });

    posts.innerHTML = allPosts;
};

const newPost = async () => {
    const title = inputTitle.value;
    const text = inputText.value;

    await fetch("http://localhost:9000/api/posts/new", {
        method: "post",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ title, text }),
    });

    if (inputTitle.value == "" || inputText.value == "") return;

    getPosts();

    inputTitle.value = "";
    inputText.value = "";
    showModal();
};

window.addEventListener("DOMContentLoaded", getPosts);
