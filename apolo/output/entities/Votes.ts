import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { UserActivity } from "./UserActivity";

@Index("post_id", ["postId"], {})
@Entity("votes", { schema: "apolo" })
export class Votes {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("int", { primary: true, name: "post_id" })
  postId: number;

  @Column("datetime", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @ManyToOne(() => User, (user) => user.votes, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => UserActivity, (userActivity) => userActivity.votes, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "post_id", referencedColumnName: "id" }])
  post: UserActivity;
}
