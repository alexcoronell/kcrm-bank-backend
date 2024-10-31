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

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "50", nullable: false })
  name: string;

  @Column({ name: "rate_required", type: "boolean", nullable: false, default: false})
  rateRequired: boolean

  @Column({ name: "franquise_required", type: "boolean", nullable: false, default: false})
  franchiseRequired: boolean

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

  	/************** RELATIONS **************/
	@OneToMany(
		() => Sale,
		(sale) => sale.product,
	)
	sales: Sale[];
}
