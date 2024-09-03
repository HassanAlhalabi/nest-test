import {
  BaseEntity as TypeOrmBaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  creationTime: Date;

  @Column({ nullable: true })
  creatorId: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  lastModifiedTime: Date;

  @Column({ nullable: true })
  lastModifiedById: number;

  @Column({ nullable: true })
  deletedById: number;
}
