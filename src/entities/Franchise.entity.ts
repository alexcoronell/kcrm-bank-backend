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
export class Franchise extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: "50", nullable: false, unique: true })
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
	active: boolean;

	@Column({ type: "boolean", default: false })
	deleted: boolean;

	/************** RELATIONS **************/
	@OneToMany(
		() => Sale,
		(sale) => sale.franchise,
	)
	sales: Sale[];
}
