// @ts-ignore
import * as jwt from 'jsonwebtoken';
import { userData, UserModel } from '../models/UserModel';
import { comparePassword, cryptPassword } from '../tools/hash-passwords';
import { AuthError } from '../tools/ErrorHandlers';

export interface IAuthService {
  SignUp(data: userData): Promise<string>;
  Login(loginData): Promise<any>;
}

export class AuthService implements IAuthService {
  private um = new UserModel();

  public async SignUp(data: userData): Promise<string> {
    const {
      firstName, lastName, login, email, password,
    } = data;
    const passwordHashed = await cryptPassword(password);

    if (await this.um.find(login)) throw new AuthError({ code: 3, message: 'User already exists' });

    await this.um.create({
      firstName,
      lastName,
      login,
      email,
      password: passwordHashed,
    });

    return AuthService.generateToken({ login });
  }

  public async Login(loginData): Promise<string> {
    const { login, password } = loginData;
    const userRecord = await this.um.find(login);
    if (!userRecord) {
      throw new AuthError({
        code: 1,
        message: 'User not found',
      });
    }
    const correctPassword = await comparePassword(
      password,
      userRecord.password,
    );
    if (!correctPassword) {
      throw new AuthError({
        code: 2,
        message: 'Incorrect password',
      });
    }
    return AuthService.generateToken(userRecord);
  }

  private static generateToken(user): string {
    const data = {
      login: user.login,
    };
    const signature = 'MySuP3R_z3kr3t';
    const expiration = '6h';

    return jwt.sign({ data }, signature, { expiresIn: expiration });
  }
}
