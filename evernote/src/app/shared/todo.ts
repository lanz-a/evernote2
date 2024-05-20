import {Image} from "./image";
export {Image} from "./image";
import {User} from "./user";
export {User} from "./user";
import {Notetag} from "./notetag";
export {Notetag} from "./notetag";
import {Notelist} from "./notelist";
export {Notelist} from "./notelist";

export class Todo {
  constructor(
    public id: number,
    public title:string,
    public description?: string,
    public notetags?: Notetag[],
    public images?: Image[],
    public users?: User[]
  ) {}
}
