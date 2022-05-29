import { BaseEntity } from '../../base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Entity()
export class Price extends BaseEntity {
  @Column()
  size: number;

  @Column()
  price: number;

  @ManyToOne(() => Menu)
  menu: Menu;
}
