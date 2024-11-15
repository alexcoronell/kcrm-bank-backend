import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { User } from "./User.entity";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "50", nullable: false, unique: true })
  @IsNotEmpty({ message: "name is required" })
  @IsString()
  name: string;

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
    name: "is_admin",
    type: "boolean",
    default: false,
  })
  isAdmin: boolean;

  @Column({
    name: "active",
    type: "boolean",
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active: boolean;

  @Column({ type: "boolean", default: false })
  @IsBoolean()
  @IsOptional()
  deleted: boolean;

  /************** RELATIONS **************/
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
