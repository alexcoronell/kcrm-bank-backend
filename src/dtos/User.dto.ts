import type { User } from "../entities/User.entity";

export interface CreateUserDto
  extends Omit<
    User,
    "id" | "createAt" | "updateAt" | "active" | "deleted" | "role"
  > {
  role: number;
}

export interface UpdateUserDto extends CreateUserDto {
  active: boolean;
}

export interface UpdatePasswordUserDto {
  password: string;
}
