import { BaseEntity } from '../../base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { MenuTypes } from '../types/menu.types';
import { MainMenuTypes } from '../types/main-menu.types';
import { File } from '../../file/entities/file.entity';
import { Price } from '../../price/entities/price.entity';

@Entity()
export class Menu extends BaseEntity {
  @Column({
    type: 'enum',
    enum: MenuTypes,
    default: MenuTypes.MAIN,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: MainMenuTypes,
  })
  mainMenuType: MainMenuTypes;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => File, (file) => file.menu)
  pictures: File[];

  @OneToMany(() => Price, (price) => price.menu)
  prices: Price[];
}
