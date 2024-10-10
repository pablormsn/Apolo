import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./Event";
import { Item } from "./Item";

@Index("item_id", ["itemId"], {})
@Entity("venue", { schema: "apolo" })
export class Venue {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "location", length: 255 })
  location: string;

  @Column("int", { name: "capacity", nullable: true })
  capacity: number | null;

  @Column("enum", {
    name: "venue_type",
    enum: ["stadium", "arena", "theater", "club", "outdoor", "other"],
  })
  venueType: "stadium" | "arena" | "theater" | "club" | "outdoor" | "other";

  @Column("varchar", { name: "contact_info", nullable: true, length: 255 })
  contactInfo: string | null;

  @Column("varchar", { name: "website", nullable: true, length: 255 })
  website: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null;

  @OneToMany(() => Event, (event) => event.venue)
  events: Event[];

  @ManyToOne(() => Item, (item) => item.venues, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Item;
}
