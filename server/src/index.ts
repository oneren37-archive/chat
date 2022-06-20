import { SignUpEndpoint } from './api/SignUpEndpoint';
import { SignInEndpoint } from './api/SignInEndpoint';
import isAuth from './middlewares/isAuth';

const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/', isAuth, (req, res) => {
  res.send("IT'S WORKING");
});
app.post('api/sign-up', SignUpEndpoint.handler);
app.post('api/sign-in', SignInEndpoint.handler);

app.listen(PORT, () => console.log('сервер запустился'));
