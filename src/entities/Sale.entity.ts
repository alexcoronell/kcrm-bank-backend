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
import { User } from "./User.entity";

@Entity()
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  quotaRequested: number;

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
  @ManyToOne(() => Product, (product) => product.sales)
  @JoinColumn({ name: "product" })
  product: number;

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: "user"})
  user: number
}
