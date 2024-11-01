import {
  BaseEntity,
  Unique,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Exclude } from "class-transformer";

import { Sale } from "./Sale.entity";
import { Role } from "./Role.entity";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "50" })
  @IsNotEmpty({message: "name is required"})
  @IsString()
  name: string;

  @Column({ type: "varchar", length: 50 })
  @IsNotEmpty({message: "email is required"})
  @IsEmail()
  email: string;

  @Exclude()
  @Column({ type: "varchar", length: 255 })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {message: "must contain at least 8 characters"})
  password: string;

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
  @IsBoolean()
  @IsOptional()
  active: boolean;

  @Column({ type: "boolean", default: false })
  deleted: boolean;

  /************** RELATIONS **************/
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role" })
  role: Role;

  @OneToMany(() => Sale, (sale) => sale.createdBy)
  createdSales: Sale[];

  @OneToMany(() => Sale, (sale) => sale.updatedBy)
  updatedSales: Sale[];
}
