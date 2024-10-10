import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("seguidor_id", ["seguidorId", "seguidoId"], { unique: true })
@Index("seguido_id", ["seguidoId"], {})
@Entity("follow", { schema: "apolo" })
export class Follow {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "seguidor_id" })
  seguidorId: number;

  @Column("int", { name: "seguido_id" })
  seguidoId: number;

  @Column("timestamp", {
    name: "fecha_seguimiento",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaSeguimiento: Date | null;

  @ManyToOne(() => User, (user) => user.follows, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "seguidor_id", referencedColumnName: "id" }])
  seguidor: User;

  @ManyToOne(() => User, (user) => user.follows2, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "seguido_id", referencedColumnName: "id" }])
  seguido: User;
}
