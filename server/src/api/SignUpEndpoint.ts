import { AuthService } from '../services/AuthService';

type Req = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
};

export abstract class SignUpEndpoint {
  public static handler(req: Req, res): void {
    new AuthService()
      .SignUp(req)
      .then((token) => res
        .status(200)
        .cookie('jwt', token, {
          // httpOnly: true,
          // secure: true,
          maxAge: 3600,
        })
        .redirect('/'))
      .catch((error) => res.status(400).send(error));
  }
}
