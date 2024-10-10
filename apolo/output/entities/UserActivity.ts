import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item";
import { User } from "./User";
import { Votes } from "./Votes";

@Index("user_id", ["userId"], {})
@Index("fk_item_activity", ["itemId"], {})
@Entity("user_activity", { schema: "apolo" })
export class UserActivity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "item_id" })
  itemId: number;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("datetime", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @ManyToOne(() => Item, (item) => item.userActivities, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;

  @ManyToOne(() => User, (user) => user.userActivities, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => Votes, (votes) => votes.post)
  votes: Votes[];
}
