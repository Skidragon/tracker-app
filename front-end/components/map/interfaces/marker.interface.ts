import { Position } from "./position.interface";
export interface Marker {
  hasReached: boolean;
  draggable: boolean;
  id: string;
  position: Position;
  label: string;
}
