import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from '/opt/nodejs/utils/type-orm';

export enum PetStatus {
  SAD = 'sad',
  HAPPY = 'happy'
}

export enum PetType {
  DOG = 'dog',
  CAT = 'cat'
}
@Entity({ name: 'pet' })
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', {
    nullable: false
  })
  foundationId: number;

  @Column('varchar', {
    nullable: false
  })
  name: string;

  @Column('varchar', {
    nullable: false
  })
  race: string;

  @Column({
    type: 'enum',
    enum: PetStatus,
    default: PetStatus.SAD
  })
  status: string;

  @Column({
    type: 'enum',
    enum: PetType,
    default: PetType.DOG
  })
  type: string;
}
