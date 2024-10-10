import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Genre } from "./Genre";
import { Item } from "./Item";
import { Album } from "./Album";
import { Artist } from "./Artist";

@Index("item_id", ["itemId"], {})
@Entity("track", { schema: "apolo" })
export class Track {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("int", { name: "duration", nullable: true })
  duration: number | null;

  @Column("decimal", {
    name: "user_score",
    nullable: true,
    precision: 3,
    scale: 2,
    default: () => "'0.00'",
  })
  userScore: string | null;

  @Column("decimal", {
    name: "verified_score",
    nullable: true,
    precision: 3,
    scale: 2,
    default: () => "'0.00'",
  })
  verifiedScore: string | null;

  @Column("date", { name: "release_date", nullable: true })
  releaseDate: string | null;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @ManyToMany(() => Genre, (genre) => genre.tracks)
  genres: Genre[];

  @ManyToOne(() => Item, (item) => item.tracks, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;

  @ManyToMany(() => Album, (album) => album.tracks)
  @JoinTable({
    name: "track_album",
    joinColumns: [{ name: "track_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "album_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  albums: Album[];

  @ManyToMany(() => Artist, (artist) => artist.tracks)
  @JoinTable({
    name: "track_artist",
    joinColumns: [{ name: "track_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  artists: Artist[];
}
