import { BaseEntity } from '../../base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Entity()
export class File extends BaseEntity {
  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  contentType: number;

  @ManyToOne(() => Menu)
  menu: Menu;
}
