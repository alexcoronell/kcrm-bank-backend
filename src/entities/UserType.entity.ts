import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity
  } from "typeorm";

  import { User } from "./User.entity";
    
  @Entity({name: "user_type"})
  export class UserType extends BaseEntity {
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
    active: boolean;
  
    @Column({ type: "boolean", default: false })
    deleted: boolean;

    /************** RELATIONS **************/
    @OneToMany(() => User, (user) => user.userType)
    users: User[];
  }
  