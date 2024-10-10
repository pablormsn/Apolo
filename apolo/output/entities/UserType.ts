import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("user_type", { schema: "apolo" })
export class UserType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "type", length: 50 })
  type: string;

  @OneToMany(() => User, (user) => user.userType2)
  users: User[];
}
