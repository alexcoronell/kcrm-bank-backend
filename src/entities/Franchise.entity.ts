import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Sale } from "./Sale.entity";

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

@Entity()
export class Franchise extends BaseEntity {
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
    name: "active",
    type: "boolean",
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @Column({ type: "boolean", default: false })
  @IsOptional()
  @IsBoolean()
  deleted: boolean;

  /************** RELATIONS **************/
  @OneToMany(() => Sale, (sale) => sale.franchise)
  sales: Sale[];
}
