require('dotenv').config();

const express = require("express");
const api = require('./routes/api');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});