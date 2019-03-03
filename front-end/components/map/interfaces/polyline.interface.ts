import { Position } from "./position.interface";

export interface Polyline {
  id: string;
  path: [Position];
  options: LineOptions;
}

interface LineOptions {
  strokeColor: string;
  strokeWeight: number;
  strokeOpacity: number;
}
