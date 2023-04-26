import { EntityTarget, ObjectLiteral } from 'typeorm';

import { Database } from '/opt/nodejs/database/database';

interface IBaseModelOperation {
  Model: EntityTarget<ObjectLiteral>;
  where?: any;
  data?: any;
}

export class BaseModel {
  static async connectionDB() {
    await Database.createDBInstance();
  }

  static async closeDB() {
    if (Database.dataSource && Database.isConnected) {
      await Database.closeConnection();
    }
  }

  static async synchronize() {
    try {
      await Database.dataSource.synchronize();
    } catch (err) {
      console.log(err);
      throw new Error(`'Error during synchronize', ${err}`);
    }
  }

  static async findOneBy({ Model, where }: IBaseModelOperation) {
    return await Database.dataSource.getRepository(Model).findOneBy(where);
  }
  static async delete({ Model, where }: IBaseModelOperation) {
    return await Database.dataSource.getRepository(Model).delete(where);
  }

  static async saveOne({ Model, data }: IBaseModelOperation) {
    return await Database.dataSource.getRepository(Model).save(data);
  }

  static async findMany({ Model, where }: IBaseModelOperation) {
    return await Database.dataSource.getRepository(Model).find(where);
  }

  static async updateById({ Model, where, data }: IBaseModelOperation) {
    return await Database.dataSource.getRepository(Model).update(where, data);
  }

  static async createOne({ Model, data }: IBaseModelOperation) {
    const document = Database.dataSource
      .getRepository(Model)
      .create(data) as ObjectLiteral;
    await document.save();
    return document;
  }

  static async updateOne({ Model, where, data }: IBaseModelOperation) {
    return await Database.dataSource.getRepository(Model).update(where, data);
  }
}
