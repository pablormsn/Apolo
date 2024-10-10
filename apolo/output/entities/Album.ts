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
import { Item } from "./Item";
import { Artist } from "./Artist";
import { Genre } from "./Genre";
import { Track } from "./Track";

@Index("item_id", ["itemId"], {})
@Entity("album", { schema: "apolo" })
export class Album {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("date", { name: "release_date", nullable: true })
  releaseDate: string | null;

  @Column("int", {
    name: "tracks_number",
    nullable: true,
    default: () => "'0'",
  })
  tracksNumber: number | null;

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

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @ManyToOne(() => Item, (item) => item.albums, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;

  @ManyToMany(() => Artist, (artist) => artist.albums)
  @JoinTable({
    name: "album_artist",
    joinColumns: [{ name: "id_album", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "id_artist", referencedColumnName: "id" }],
    schema: "apolo",
  })
  artists: Artist[];

  @ManyToMany(() => Genre, (genre) => genre.albums)
  genres: Genre[];

  @ManyToMany(() => Track, (track) => track.albums)
  tracks: Track[];
}
