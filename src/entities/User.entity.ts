import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from "typeorm";

import { Exclude } from "class-transformer";

import { UserType } from "../types/userType.type";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "50" })
  name: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Exclude()
  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ name: "user-type", nullable: false })
  userType: UserType;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateAt: Date;

  @Column({
    name: "active",
    type: "boolean",
    default: true,
  })
  active: boolean;

  @Column({ type: "boolean", default: false })
  deleted: boolean;
}
