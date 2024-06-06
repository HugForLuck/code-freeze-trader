import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ETrader {
  @PrimaryColumn()
  traderId: string;

  @Column()
  name: string;
}
