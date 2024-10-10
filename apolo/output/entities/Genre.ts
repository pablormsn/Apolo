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
import { Album } from "./Album";
import { Artist } from "./Artist";
import { Subgenre } from "./Subgenre";
import { Track } from "./Track";

@Index("item_id", ["itemId"], {})
@Entity("genre", { schema: "apolo" })
export class Genre {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "NAME", length: 50 })
  name: string;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @ManyToOne(() => Item, (item) => item.genres, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;

  @ManyToMany(() => Album, (album) => album.genres)
  @JoinTable({
    name: "genre_album",
    joinColumns: [{ name: "genre_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "album_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  albums: Album[];

  @ManyToMany(() => Artist, (artist) => artist.genres)
  @JoinTable({
    name: "genre_artist",
    joinColumns: [{ name: "genre_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  artists: Artist[];

  @ManyToMany(() => Subgenre, (subgenre) => subgenre.genres)
  @JoinTable({
    name: "genre_subgenre",
    joinColumns: [{ name: "genre_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "subgenre_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  subgenres: Subgenre[];

  @ManyToMany(() => Track, (track) => track.genres)
  @JoinTable({
    name: "genre_track",
    joinColumns: [{ name: "genre_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "track_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  tracks: Track[];
}
