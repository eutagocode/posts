const express = require("express");
const routes = require("./routes/router");
const app = express();
const port = 9000;

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.listen(port, () => {
    console.log("listening server on port", port);
});
