import mysql from 'serverless-mysql';

interface IOptions {
  config: {
    host: string;
    user: string;
    password: string;
    port: number;
    database: string;
  };
}

const options: IOptions = {
  config: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'product_db',
  },
};

export const conn = mysql(options);
