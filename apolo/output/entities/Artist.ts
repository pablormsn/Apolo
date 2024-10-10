import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Album } from "./Album";
import { Item } from "./Item";
import { Event } from "./Event";
import { Genre } from "./Genre";
import { Track } from "./Track";

@Index("item_id", ["itemId"], {})
@Entity("artist", { schema: "apolo" })
export class Artist {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("text", { name: "biography", nullable: true })
  biography: string | null;

  @Column("decimal", {
    name: "verified_score",
    nullable: true,
    precision: 3,
    scale: 2,
    default: () => "'0.00'",
  })
  verifiedScore: string | null;

  @Column("decimal", {
    name: "user_score",
    nullable: true,
    precision: 3,
    scale: 2,
    default: () => "'0.00'",
  })
  userScore: string | null;

  @Column("date", { name: "birthdate", nullable: true })
  birthdate: string | null;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @ManyToMany(() => Album, (album) => album.artists)
  albums: Album[];

  @ManyToOne(() => Item, (item) => item.artists, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;

  @ManyToMany(() => Event, (event) => event.artists)
  events: Event[];

  @ManyToMany(() => Genre, (genre) => genre.artists)
  genres: Genre[];

  @ManyToMany(() => Track, (track) => track.artists)
  tracks: Track[];
}
