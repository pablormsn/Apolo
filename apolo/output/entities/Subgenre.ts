import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./Genre";

@Entity("subgenre", { schema: "apolo" })
export class Subgenre {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "NAME", length: 50 })
  name: string;

  @ManyToMany(() => Genre, (genre) => genre.subgenres)
  genres: Genre[];
}
