import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";
import { Comment } from "./Comment";

@Index("author_id", ["authorId"], {})
@Entity("article", { schema: "apolo" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("int", { name: "author_id", nullable: true })
  authorId: number | null;

  @Column("timestamp", {
    name: "published_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  publishedDate: Date | null;

  @Column("varchar", { name: "image_url", nullable: true, length: 255 })
  imageUrl: string | null;

  @Column("int", { name: "views", nullable: true, default: () => "'0'" })
  views: number | null;

  @ManyToOne(() => User, (user) => user.articles, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "author_id", referencedColumnName: "id" }])
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable({
    name: "article_tag",
    joinColumns: [{ name: "article_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "tag_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
