import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Index("user", ["user"], {})
@Index("fk_item_favorite", ["itemId"], {})
@Entity("favorite", { schema: "apolo" })
export class Favorite {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user" })
  user: number;

  @Column("int", { name: "item_id" })
  itemId: number;

  @Column("timestamp", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @ManyToOne(() => User, (user) => user.favorites, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user", referencedColumnName: "id" }])
  user2: User;

  @ManyToOne(() => Item, (item) => item.favorites, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;
}
