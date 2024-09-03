import { LANGUAGES } from '../../common/constants';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: LANGUAGES;

  @Column()
  isDefault: boolean;
}
