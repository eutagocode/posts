const express = require("express");
const uuid = require("uuid").v4;
const app = express();
const port = 9000;

const posts = [
    {
        id: uuid(),
        title: "Github",
        desc: "O Github é o melhor",
    },
];

app.use(express.json());

app.get("/posts", (request, response) => {
    return response.json(JSON.stringify(posts));
});

app.post("/posts/new", (request, response) => {
    const { title, desc } = request.body;

    const post = { id: uuid(), title, desc };

    posts.push(post);

    return response.json(post);
});

app.put("/posts/:id", (request, response) => {
    const { id } = request.params;
    const { title, desc } = request.body;

    const postIndex = posts.findIndex((post) => post.id == id);

    if (postIndex < 0) {
        return response.status(404).json({ error: "Post not found" });
    }

    posts[postIndex] = { id, title, desc };

    response.json(posts[postIndex]);
});

app.delete("/", (request, response) => {
    console.log("DELETE");
});

app.listen(port, () => {
    console.log("listening server on port", port);
});
