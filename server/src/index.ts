const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
  res.send("IT'S WORKING");
});

app.listen(PORT, () => console.log('сервер запустился'));
