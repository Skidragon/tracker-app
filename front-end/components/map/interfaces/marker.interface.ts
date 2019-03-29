import {Position} from "./position.interface";
import {Moment} from "moment";

export interface Marker {
  hasReached: boolean;
  draggable: boolean;
  id: string;
  position: Position;
  label: string;
  labelStyle: object;
  url: string;
  date: Moment;
}
