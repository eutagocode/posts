const express = require("express");
const cors = require("cors");
const uuid = require("uuid").v4;
const router = express.Router();

const posts = [
    {
        id: uuid(),
        title: "Posts",
        text: "Uma aplicação backend e frontend utilizando express para criação do meu servidor e html, css e javascript para atuar no frontend.",
    },
];

router.use(cors({ origin: "http://localhost:9000" }));

router.get("/posts", (request, response) => {
    return response.json(JSON.stringify(posts));
});

router.post("/posts/new", (request, response) => {
    const { title, text } = request.body;

    const post = { id: uuid(), title, text };

    posts.push(post);

    return response.json(post);
});

router.put("/posts/:id", (request, response) => {
    const { id } = request.params;
    const { title, text } = request.body;

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex < 0) {
        return response.status(404).json({ error: "Post not found" });
    }

    posts[postIndex] = { id, title, text };

    return response.json(posts);
});

router.delete("/posts/:id", (request, response) => {
    const { id } = request.params;

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex < 0) {
        return response.status(404).json({ error: "Post not found" });
    }

    posts.splice(postIndex, 1);

    return response.json("Post deletado com sucesso!");
});

module.exports = router;
