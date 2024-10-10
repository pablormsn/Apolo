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
import { Comment } from "./Comment";
import { Favorite } from "./Favorite";
import { Follow } from "./Follow";
import { Review } from "./Review";
import { UserType } from "./UserType";
import { UserActivity } from "./UserActivity";
import { Votes } from "./Votes";

@Index("nombre_usuario", ["username"], { unique: true })
@Index("correo", ["email"], { unique: true })
@Index("user_type", ["userType"], {})
@Entity("user", { schema: "apolo" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "fullname", length: 255 })
  fullname: string;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("date", { name: "birthdate" })
  birthdate: string;

  @Column("varchar", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "spotify_link", nullable: true, length: 255 })
  spotifyLink: string | null;

  @Column("text", { name: "biography", nullable: true })
  biography: string | null;

  @Column("varchar", { name: "profile_pic", nullable: true, length: 255 })
  profilePic: string | null;

  @Column("varchar", { name: "cover_pic", nullable: true, length: 255 })
  coverPic: string | null;

  @Column("timestamp", {
    name: "register_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  registerDate: Date | null;

  @Column("tinyint", { name: "verified", width: 1, default: () => "'0'" })
  verified: boolean;

  @Column("int", { name: "user_type" })
  userType: number;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.user2)
  favorites: Favorite[];

  @OneToMany(() => Follow, (follow) => follow.seguidor)
  follows: Follow[];

  @OneToMany(() => Follow, (follow) => follow.seguido)
  follows2: Follow[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @ManyToOne(() => UserType, (userType) => userType.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_type", referencedColumnName: "id" }])
  userType2: UserType;

  @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
  userActivities: UserActivity[];

  @OneToMany(() => Votes, (votes) => votes.user)
  votes: Votes[];
}
