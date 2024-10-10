import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Item } from "./Item";

@Index("fk_item_tag", ["itemId"], {})
@Entity("tag", { schema: "apolo" })
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 70 })
  name: string;

  @Column("int", { name: "item_id" })
  itemId: number;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];

  @ManyToOne(() => Item, (item) => item.tags, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;
}
