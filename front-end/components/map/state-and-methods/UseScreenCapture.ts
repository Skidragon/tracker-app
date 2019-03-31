import {useState, KeyboardEvent} from "react";
import {MapEvent} from "../interfaces/index";
import {mapImageUrlGenerator} from "../helper-functions/index";
export default () => {
  const [googleImageUrl, setGoogleImageUrl] = useState("");
  const [isScreenOn, setScreenOn] = useState(false);
  const [latLng, setLatLng] = useState({
    lat: 0,
    lng: 0,
  });

  const ESCAPE_KEY = 27;

  const onEndScreenCapture = (
    captureWidth: number,
    captureHeight: number,
  ): void => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = mapImageUrlGenerator(
      latLng.lat,
      latLng.lng,
      captureWidth,
      captureHeight,
      6,
      "png",
      "roadmap",
      //@ts-ignore
      apiKey,
    );
    console.log(url);
    setGoogleImageUrl(url);
    setScreenOn(false);
  };
  const setScreenLatLng = (e: MapEvent) => {
    setLatLng({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const exitScreenCapture = (e: KeyboardEvent) => {
    if (e.keyCode === ESCAPE_KEY) {
      setScreenOn(false);
    }
  };
  return {
    //methods
    onEndScreenCapture,
    setScreenLatLng,
    setScreenOn,
    exitScreenCapture,
    //state
    googleImageUrl,
    isScreenOn,
    screenLatLng: latLng,
  };
};
