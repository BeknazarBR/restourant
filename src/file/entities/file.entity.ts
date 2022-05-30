import { BaseEntity } from '../../base/base.entity';
import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Entity()
export class File extends BaseEntity {
  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  contentType: string;

  @ManyToOne(() => Menu)
  menu: Menu;

  url: string;

  @AfterLoad()
  genUrl() {
    this.url = this.name;
  }
}
