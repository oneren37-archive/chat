import { AuthService } from '../services/AuthService';

type ReqBody = {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
};

export function SignUpEndpoint(req, res): void {
  const { body } = req;

  new AuthService()
    .SignUp(body)
    .then((token) => res
      .status(200)
      .cookie('jwt', token, {
        maxAge: 3600,
      })
      .redirect('/'))
    .catch((e) => res.status(e.code).json(e.data ? e.data : 'Unknown error'));
}
