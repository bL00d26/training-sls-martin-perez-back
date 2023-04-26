import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from '/opt/nodejs/utils/type-orm';

@Entity({ name: 'foundation' })
export class Foundation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    unique: true,
    nullable: false
  })
  name: string;

  @Column('varchar', {
    unique: true,
    nullable: false
  })
  owner: string;
}
