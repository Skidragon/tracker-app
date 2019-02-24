export { useMarker };

import { useState } from "react";
import uuidv4 from "uuid/v4";

function useMarker(e) {
  const [markers, setMarkers] = useState([]);

  const addMarker = e => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newMarker = {
      draggable: true,
      label: "a",
      id: uuidv4(),
      position: {
        lat,
        lng
      },
      hasReached: false
    };
    // console.log(markers);
    setMarkers([...markers, newMarker]);
  };

  const deleteMarker = id => {
    const deleteIndex = markers.findIndex(mark => {
      return mark.id === id;
    });
    setMarkers([
      ...markers.slice(0, deleteIndex),
      ...markers.slice(deleteIndex + 1)
    ]);
  };

  const [markerId, setMarkerId] = useState("");
  const clearMarkerId = () => setMarkerId("");

  const updateMarkerPosition = (id, e, cb) => {
    const updateIndex = markers.findIndex(mark => {
      return id === mark.id;
    });

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const updatedMarker = {
      ...markers[updateIndex],
      position: {
        lat,
        lng
      }
    };

    setMarkers([
      ...markers.slice(0, updateIndex),
      updatedMarker,
      ...markers.slice(updateIndex + 1)
    ]);
  };
  return {
    //methods
    addMarker,
    deleteMarker,
    updateMarkerPosition,
    setMarkerId,
    clearMarkerId,
    updateMarkerPosition,
    //state
    markers,
    markerId
  };
}
