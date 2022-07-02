import { AuthService } from '../services/AuthService';

type ReqBody = {
    login: string;
    password: string;
};

export function SignInEndpoint(req, res): void {
  const { body } = req;

  new AuthService()
    .Login(body)
    .then((token) => res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600,
      })
      .redirect('/'))
    .catch((e) => res.status(e.code).json(e.data ? e.data : 'Unknown error'));
}
