import { Position } from "./position.interface";
export interface Marker {
  hasReached: boolean;
  draggable: boolean;
  id: string | number;
  position: Position;
  label: string;
}
