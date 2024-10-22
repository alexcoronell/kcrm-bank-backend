import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

import { Product } from "./Product.entity";
import { Franchise } from "./Franchise.entity";
import { User } from "./User.entity";

@Entity()
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "quota_requested"})
  quotaRequested: number;

  @Column()
  rate: string;

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
  @ManyToOne(() => Product, (product) => product.sales)
  @JoinColumn({ name: "product" })
  product: number;

  @ManyToOne(() => Franchise, (franchise) => franchise.sales)
  @JoinColumn({ name: "franchise" })
  franchise: number;

  @ManyToOne(() => User, (user) => user.createdSales)
  @JoinColumn({ name: "created_by_user"})
  createdBy: number

  @ManyToOne(() => User, (user) => user.updatedSales)
  @JoinColumn({ name: "updated_by_user"})
  updatedBy: number
}
