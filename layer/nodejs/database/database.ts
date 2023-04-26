import { DataSource } from 'typeorm';
import { Foundation } from '/opt/nodejs/entity/foundation';
import { Pet } from '/opt/nodejs/entity/pet';

export class Database {
  static dataSource: DataSource;
  static isConnected: boolean = false;

  static async createDataSource() {
    Database.dataSource = new DataSource({
      type: 'mysql',
      host: 'database-1.ceaxncbjvwvj.us-east-1.rds.amazonaws.com',
      username: 'admin',
      password: 'password',
      port: 3306,
      database: 'pets_training',
      entities: [Foundation, Pet]
    });
  }
  static async createDBInstance() {
    if (!Database.isConnected) {
      await Database.createDataSource();
      try {
        await Database.dataSource.initialize();
        Database.isConnected = true;
        console.log('Data Source has been initialized successfully.');
      } catch (err) {
        Database.isConnected = false;
        throw new Error(`'Error during Data Source initialization:', ${err}`);
      }
    } else {
      console.log(`después: ${Database.isConnected}`);
      Database.isConnected = true;
    }
  }

  static async closeConnection() {
    try {
      await Database.dataSource.destroy();
      Database.isConnected = false;
      console.log('Connection close');
    } catch (err) {
      throw new Error(`'Error during Data Source close connection:', ${err}`);
    }
  }
}
