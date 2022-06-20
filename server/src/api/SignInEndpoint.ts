import { AuthService } from '../services/AuthService';

type Req = {
  login: string;
  password: string;
};

export abstract class SignInEndpoint {
  public static handler(req: Req, res): void {
    new AuthService()
      .Login(req)
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
