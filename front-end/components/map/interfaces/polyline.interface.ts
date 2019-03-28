import { Position } from "./position.interface";

export interface Polyline {
  id: string;
  path: [Position];
  strokeColor: string;
  strokeWeight: number;
  strokeOpacity: number;
  icons: [any];
}
