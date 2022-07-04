import * as path from 'path';
import { SignUpEndpoint } from './api/SignUpEndpoint';
import { SignInEndpoint } from './api/SignInEndpoint';
import { AuthEndpoint } from './api/AuthEndpoint';

const cookieParser = require('cookie-parser');

const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(`${__dirname}../../../client/build/`)));

app.post('/api/sign-up', SignUpEndpoint);
app.post('/api/sign-in', SignInEndpoint);
app.get('/api/is-auth', AuthEndpoint);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}../../../client/build/index.html`));
});

app.listen(PORT, () => console.log('сервер запустился'));
