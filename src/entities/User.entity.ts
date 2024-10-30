import {
	BaseEntity,
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
import { UserType } from "./UserType.entity";

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
	@ManyToOne(
		() => UserType,
		(userType) => userType.users,
	)
	@JoinColumn({ name: "user_type" })
	userType: number;

	@OneToMany(
		() => Sale,
		(sale) => sale.createdBy,
	)
	createdSales: Sale[];

	@OneToMany(
		() => Sale,
		(sale) => sale.updatedBy,
	)
	updatedSales: Sale[];
}
