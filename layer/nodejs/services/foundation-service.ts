import { Foundation } from '/opt/nodejs/entity/foundation';
import { BaseModel } from '/opt/nodejs/services/base-model';

export class FoundationService extends BaseModel {
  private static Model = Foundation;
  static async create(data: any) {
    return await this.saveOne({ Model: this.Model, data });
  }

  static async findById(id: number) {
    return await this.findOneBy({ Model: Foundation, where: { id } });
  }

  static async findOne(where: any) {
    return await this.findOneBy({ Model: Foundation, where });
  }
}
