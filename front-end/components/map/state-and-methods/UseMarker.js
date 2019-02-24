export { useMarker };

import { useState } from "react";
import uuidv4 from "uuid/v4";
import { letters } from "../lib/labels";

function useMarker(e) {
  const [markers, setMarkers] = useState([]);

  const addMarker = e => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newMarker = {
      draggable: true,
      label: letters[markers.length % letters.length].toUpperCase(),
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

  const updateMarkerPosition = (id, e) => {
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

  const updateAllMarkerLabels = id => {
    const startUpdateIndex =
      markers.findIndex(mark => {
        return mark.id === id;
      }) + 1;
    const affectedMarkers = [];
    for (let i = startUpdateIndex; i < markers.length; i++) {
      let updatedMarker = {
        ...markers[i],
        label: letters[(i - 1) % letters.length].toUpperCase()
      };
      affectedMarkers.push(updatedMarker);
    }

    console.log("new markers: ", [
      ...markers.slice(0, startUpdateIndex - 1),
      ...affectedMarkers
    ]);
    setMarkers([...markers.slice(0, startUpdateIndex - 1), ...affectedMarkers]);
  };
  return {
    //methods
    addMarker,
    deleteMarker,
    updateMarkerPosition,
    setMarkerId,
    clearMarkerId,
    updateMarkerPosition,
    updateAllMarkerLabels,
    //state
    markers,
    markerId
  };
}
