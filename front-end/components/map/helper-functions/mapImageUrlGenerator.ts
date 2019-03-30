// import {Marker, Polyline} from "../interfaces";

type ImageFormat = "png" | "jpg";

type MapType = "roadmap";
export default (
  lat: string | number,
  lng: string | number,
  width: string | number,
  height: string | number,
  imgFormat: ImageFormat,
  mapType: MapType,
  apiKey: string,
  //   markers: Marker[],
  //   polylines: Polyline[],
) => {
  return `https://maps.googleapis.com/maps/api/staticmap?\
center=${lat},${lng}&\
format=${imgFormat}&\
maptype=${mapType}&\
size=${width}x${height}&\
key=${apiKey}`;
};
