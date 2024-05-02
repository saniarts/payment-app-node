require('dotenv').config();

const express = require("express");
const api = require('./routes/api');
const web = require('./routes/web');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// app.get("/", (req, res) => {
//   res.json({ message: "ok" });
// });


app.use('/api', api);
app.use('/', web);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});