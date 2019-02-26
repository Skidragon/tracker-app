export { changeMarkersProps };

const changeMarkersProps = (markers, newAttributes, startIndex, endIndex) => {
  if (startIndex === undefined || endIndex === undefined) {
    throw new Error("changeMarkerProps needs a startIndex and endIndex");
  }
  const newMarkers = markers.slice();
  if (startIndex > endIndex) {
    for (let i = startIndex; i >= endIndex; i--) {
      newMarkers[i] = {
        ...markers[i],
        ...newAttributes
      };
    }
  } else if (startIndex < endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      newMarkers[i] = {
        ...markers[i],
        ...newAttributes
      };
    }
  } else {
    newMarkers[startIndex] = {
      ...markers[startIndex],
      ...newAttributes
    };
  }
  return newMarkers;
};
