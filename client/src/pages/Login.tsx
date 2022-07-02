import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HTTPErrorCatcher } from '../utils/HTTPErrorCatcher';

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [formError, setFormError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch('/api/sign-in', {
      method: 'POST',
      body: JSON.stringify({
        login: data.get('login'),
        password: data.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(HTTPErrorCatcher)
      .then(() => navigate('/'))
      .catch((e) => {
        try {
          const errorData = JSON.parse(e.message);
          if (errorData.code === 1) {
            setErrorText('Неверный логин или пароль');
          } else if (errorData.code === null) setErrorText('Сервак лежит');
        } catch (e) {
          setErrorText('Произошла неизвестная ошибка');
        } finally {
          setFormError(true);
          console.log(errorText);
        }
      });
  };

  // const [ formError, setFormError ] = useState(false);
  // const [ errorText, setErrorText ] = useState('');
  //
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     fetch('/api/sign-up', {
  //         method: 'POST',
  //         body: JSON.stringify({
  //             firstName: data.get('firstName'),
  //             lastName: data.get('lastName'),
  //             login: data.get('login'),
  //             email: data.get('email'),
  //             password: data.get('password'),
  //         }),
  //         headers: { 'Content-Type': 'application/json' },
  //     })
  //         .then(HTTPErrorCatcher)
  //         .then(() => navigate('/'))
  //         .catch(e => {
  //             try {
  //                 const errorData = JSON.parse(e.message)
  //                 if (errorData.code === 1 && errorData.subCode === 3) {
  //                     setErrorText('Такой пользователь уже зарегистрирован')
  //                 }
  //                 else if (errorData.code === null) setErrorText('Сервак лежит')
  //             } catch (e) {
  //                 setErrorText('Произошла неизвестная ошибка')
  //             }
  //             finally {
  //                 setFormError(true)
  //             }
  //         });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              error={formError}
              onChange={() => setFormError(false)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formError}
              onChange={() => setFormError(false)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
            <p>{formError ? errorText : ''}</p>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
