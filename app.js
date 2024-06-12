const express = require("express");
const app = express();
const port = 9000;

const posts = [
    {
        id: 123,
        title: "Github",
        description: "O Github é o melhor",
    },
];

app.use(express.json());

app.get("/posts", (request, response) => {
    return response.json(JSON.stringify(posts));
});

app.post("/", (request, response) => {
    console.log("POST");
});

app.put("/", (request, response) => {
    console.log("PUT");
});

app.delete("/", (request, response) => {
    console.log("DELETE");
});

app.listen(port, () => {
    console.log("listening server on port", port);
});
