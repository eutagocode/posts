const express = require("express");
const cors = require("cors");
const uuid = require("uuid").v4;
const router = express.Router();

class Posts {
    constructor(text) {
        this.id = uuid();
        this.text = text;
    }
}

const posts = [];

router.use(cors({ origin: "http://localhost:9000" }));

router.get("/posts", (request, response) => {
    return response.json(JSON.stringify(posts));
});

router.post("/posts/new", (request, response) => {
    const { text } = request.body;

    const post = new Posts(text);

    posts.push(post);

    return response.json(post);
});

router.put("/posts/:id", (request, response) => {
    const { id } = request.params;
    const { text } = request.body;

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex < 0) {
        return response.status(404).json({ error: "Post not found" });
    }

    posts[postIndex] = { id, text };

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
