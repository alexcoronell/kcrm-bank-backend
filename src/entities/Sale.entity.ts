import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsNumber, IsPositive, IsOptional } from "class-validator";

/* Entities */
import { Franchise } from "./Franchise.entity";
import { User } from "./User.entity";

/* Enums */
import { Product } from "./Product.entity";

@Entity()
export class Sale extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "quota_requested" })
	@IsNotEmpty({ message: "Quote requested cannot be empty"})
	@IsNumber({},{ message: "Quote requested must be a number"})
	@IsPositive({message: "Quota requested must be a positive number"})
	quotaRequested: number;

	@Column({nullable: true})
	@IsNumber({},{ message: "Rate must be a number"})
	@IsPositive({message: "Rate must be a positive number"})
	@IsOptional()
	rate: number;

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

	@Column({ type: "boolean", default: false })
	deleted: boolean;

	/************** RELATIONS **************/
	@ManyToOne(
		() => User,
		(user) => user.updatedSales,
	)
	@JoinColumn({ name: "updated_by_user" })
	@IsNotEmpty({ message: "Updated By User cannot be empty"})
	@IsNumber({},{ message: "Updated By User must be a number"})
	@IsPositive({message: "Updated By User must be a positive number"})
	updatedBy: number;

	@ManyToOne(
		() => Franchise,
		(franchise) => franchise.sales,
	)
	@JoinColumn({ name: "franchise" })
	@IsNumber({},{ message: "Franchise must be a number"})
	@IsPositive({message: "Franchise must be a positive number"})
	@IsOptional()
	franchise: number;

	@ManyToOne(
		() => User,
		(user) => user.createdSales,
	)
	@JoinColumn({ name: "created_by_user" })
	@IsNotEmpty({ message: "Created By User cannot be empty"})
	@IsNumber({},{ message: "Created By User must be a number"})
	@IsPositive({message: "Created By User must be a positive number"})
	createdBy: number;

	@ManyToOne(
		() => Product,
		(product) => product.sales,
	)
	@JoinColumn({ name: "product" })
	@IsNotEmpty({ message: "Product cannot be empty"})
	@IsNumber({},{ message: "Product must be a number"})
	@IsPositive({message: "Product must be a positive number"})
	product: number;
}
