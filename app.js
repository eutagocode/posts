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

app.put("/posts/:id", (request, response) => {});

app.delete("/", (request, response) => {
    console.log("DELETE");
});

app.listen(port, () => {
    console.log("listening server on port", port);
});
