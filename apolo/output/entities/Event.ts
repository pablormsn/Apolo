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
import { Venue } from "./Venue";
import { Artist } from "./Artist";

@Index("venue_id", ["venueId"], {})
@Entity("event", { schema: "apolo" })
export class Event {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("int", { name: "venue_id", nullable: true })
  venueId: number | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "ticket_url", nullable: true, length: 255 })
  ticketUrl: string | null;

  @ManyToOne(() => Venue, (venue) => venue.events, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "venue_id", referencedColumnName: "id" }])
  venue: Venue;

  @ManyToMany(() => Artist, (artist) => artist.events)
  @JoinTable({
    name: "event_artist",
    joinColumns: [{ name: "event_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
    schema: "apolo",
  })
  artists: Artist[];
}
