const mysql = require('mysql');

interface IDB {
  execute(query: string): Promise<any>;
}

export class DB implements IDB {
  private host: string = 'us-cdbr-east-05.cleardb.net';

  private user: string = 'b5e7cddb5b68b0';

  private password: string = 'd2afb4dd';

  private database: string = 'heroku_32b6c811e1dfdc1';

  private connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });
    this.connection.connect();
  }

  public execute(query: string): any {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results, fields) => {
        if (error) reject(error);
        resolve({ error, results, fields });
      });
    });
  }
}
