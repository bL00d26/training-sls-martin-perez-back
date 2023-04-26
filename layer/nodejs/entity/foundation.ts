import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from '/opt/nodejs/utils/type-orm';

@Entity({ name: 'foundation' })
export class Foundation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  owner: number;
}
