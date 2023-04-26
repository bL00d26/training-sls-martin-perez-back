import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from '/opt/nodejs/utils/type-orm';

@Entity({ name: 'pet' })
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  foundationId: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  race: string;

  @Column('varchar')
  status: string;

  @Column('varchar')
  type: string;
}
