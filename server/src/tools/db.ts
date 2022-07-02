const mysql = require('mysql');

interface IDB {
    execute(query: string): Promise<any>;
}

export class DB implements IDB {
  private connection;

  private config = {
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b5e7cddb5b68b0',
    password: 'd2afb4dd',
    database: 'heroku_32b6c811e1dfdc1',
  };

  private autoConnect() {
    this.connection = mysql.createConnection(this.config);

    this.connection.connect((err) => {
      if (err) {
        setTimeout(this.autoConnect, 2000);
      }
    });

    this.connection.on('error', (err) => {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') this.autoConnect();
    });
  }

  constructor() {
    this.autoConnect();
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
