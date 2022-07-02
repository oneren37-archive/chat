import { AbstractModel } from './AbstarctModel';

export type userKey = string;

export type userData = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
};

export interface IUserModel {
  find(key: userKey): Promise<userData>;
  create(data: userData): Promise<any>;
  get(key: userKey): Promise<userData>;
}

export class UserModel extends AbstractModel implements IUserModel {
  constructor() {
    console.log('конструктор модели пользователя');
    super();
  }

  public async find(key: userKey): Promise<userData> {
    return this.DB.execute(`select * from user where login="${key}"`).then(
      (res) => res.results[0],
    );
  }

  public create(data: userData) {
    const {
      firstName, lastName, login, email, password,
    } = data;
    return this.DB.execute(
      `insert into user (firstName, lastName, login, email, password) values ("${firstName}", "${lastName}", "${login}", "${email}", "${password}")`,
    );
  }

  public get(key: userKey): Promise<userData> {
    return this.DB.execute(`select * from user where login="${key}"`);
  }
}
