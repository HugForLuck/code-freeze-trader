import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Trader {
  @PrimaryColumn()
  traderId: string;

  @Column()
  name: string;
}
