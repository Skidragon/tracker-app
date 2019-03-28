import {Marker} from "../interfaces/index";
export default (
  markers: [Marker],
  newProps: object,
  startIndex: number,
  endIndex: number,
) => {
  if (startIndex === undefined || endIndex === undefined) {
    throw new Error("changeMarkerProps needs a startIndex and endIndex");
  }
  const newMarkers = markers.slice();
  if (startIndex > endIndex) {
    for (let i = startIndex; i >= endIndex; i--) {
      newMarkers[i] = {
        ...markers[i],
        ...newProps,
      };
    }
  } else if (startIndex < endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      newMarkers[i] = {
        ...markers[i],
        ...newProps,
      };
    }
  } else {
    newMarkers[startIndex] = {
      ...markers[startIndex],
      ...newProps,
    };
  }
  return newMarkers;
};
