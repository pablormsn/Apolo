import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Index("article_id", ["articleId"], {})
@Index("user_id", ["userId"], {})
@Index("parent_id", ["parentId"], {})
@Entity("comment", { schema: "apolo" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "article_id", nullable: true })
  articleId: number | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "parent_id", nullable: true })
  parentId: number | null;

  @Column("text", { name: "content" })
  content: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["active", "deleted"],
    default: () => "'active'",
  })
  status: "active" | "deleted" | null;

  @ManyToOne(() => Article, (article) => article.comments, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "id" }])
  article: Article;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  comments: Comment[];
}
