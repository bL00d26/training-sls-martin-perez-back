import { Pet } from '/opt/nodejs/entity/pet';
import { BaseModel } from '/opt/nodejs/database/base-model';

export class PetService extends BaseModel {
  private static Model = Pet;

  static async create(data: any) {
    return await this.saveOne({ Model: this.Model, data });
  }

  static async findById(id: number, foundationId: number) {
    return await this.findOneBy({
      Model: this.Model,
      where: { id, foundationId }
    });
  }

  static async update(
    { id, foundationId }: { id: number; foundationId: number },
    data: any
  ) {
    await this.updateById({
      Model: this.Model,
      where: { id, foundationId },
      data
    });
    return await this.findById(id, foundationId);
  }

  static async findByFoundationId(id: number) {
    return await this.findMany({
      Model: this.Model,
      where: { foundationId: id }
    });
  }

  static async filterPets(data: any) {
    return await this.findMany({ Model: this.Model, where: data });
  }

  static async findOne(where: any) {
    return await this.findOneBy({ Model: this.Model, where });
  }

  static async deleteById(id: number, foundationId: number) {
    return await this.delete({
      Model: this.Model,
      where: { id, foundationId }
    });
  }
}
