interface Position {
  lat: number;
  lng: number;
}
interface Marker {
  hasReached: boolean;
  draggable: boolean;
  id: string | number;
  position: Position;
  label: string;
}

export { Marker, Position };
