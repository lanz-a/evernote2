import {Image} from "./image";
export {Image} from "./image";
import {User} from "./user";
export {User} from "./user";
import {Notetag} from "./notetag";
export {Notetag} from "./notetag";
import {Note} from "./note";
export {Note} from "./note";

export class Notelist {
  constructor(
    public id: number,
    public title:string,
    public description?: string,
    public notetags?: Notetag[],
    public images?: Image[],
    public users?: User[],
    public created_at?: string,
    public note?: Note[],
  ) {}
}
