import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { Favorite } from "./Favorite";
import { Genre } from "./Genre";
import { Review } from "./Review";
import { Tag } from "./Tag";
import { Track } from "./Track";
import { UserActivity } from "./UserActivity";
import { Venue } from "./Venue";

@Index("item_type", ["itemType", "itemId"], { unique: true })
@Entity("item", { schema: "apolo" })
export class Item {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("enum", {
    name: "item_type",
    enum: ["track", "album", "artist", "venue", "genre"],
  })
  itemType: "track" | "album" | "artist" | "venue" | "genre";

  @Column("int", { name: "item_id" })
  itemId: number;

  @OneToMany(() => Album, (album) => album.item)
  albums: Album[];

  @OneToMany(() => Artist, (artist) => artist.item)
  artists: Artist[];

  @OneToMany(() => Favorite, (favorite) => favorite.item)
  favorites: Favorite[];

  @OneToMany(() => Genre, (genre) => genre.item)
  genres: Genre[];

  @OneToMany(() => Review, (review) => review.item)
  reviews: Review[];

  @OneToMany(() => Tag, (tag) => tag.item)
  tags: Tag[];

  @OneToMany(() => Track, (track) => track.item)
  tracks: Track[];

  @OneToMany(() => UserActivity, (userActivity) => userActivity.item)
  userActivities: UserActivity[];

  @OneToMany(() => Venue, (venue) => venue.item)
  venues: Venue[];
}
