// import {Marker, Polyline} from "../interfaces";

type ImageFormat = "png" | "jpg";

type MapType = "roadmap";
export default (
  lat: number,
  lng: number,
  width: number,
  height: number,
  zoom: number,
  imgFormat: ImageFormat,
  mapType: MapType,
  apiKey: string,
  //   markers: Marker[],
  //   polylines: Polyline[],
) => {
  return `https://maps.googleapis.com/maps/api/staticmap?\
center=${lat},${lng}&\
size=${width}x${height}&\
zoom=${zoom}&\
format=${imgFormat}&\
maptype=${mapType}&\
key=${apiKey}`;
};
