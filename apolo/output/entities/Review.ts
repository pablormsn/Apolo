import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Index("user_id", ["userId"], {})
@Index("fk_item_review", ["itemId"], {})
@Entity("review", { schema: "apolo" })
export class Review {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("double", { name: "score", precision: 22 })
  score: number;

  @Column("tinyint", { name: "verified", nullable: true, default: () => "'0'" })
  verified: number | null;

  @Column("text", { name: "text", nullable: true })
  text: string | null;

  @Column("int", { name: "item_id" })
  itemId: number;

  @ManyToOne(() => Item, (item) => item.reviews, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
