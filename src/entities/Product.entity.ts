import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
  } from "typeorm";
    
  @Entity()
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: "50" })
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
  }
  