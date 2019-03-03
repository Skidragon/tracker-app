export { useMarker };
import { Marker } from "../interfaces/marker.interface";
import { useState } from "react";
import uuidv4 from "uuid/v4";
import { letters } from "../lib/labels";

function useMarker() {
  const [markers, setMarkers] = useState([]);
  const [markerId, setMarkerId] = useState("");
  const [activeMarker, setActiveMarker] = useState({});

  const addMarker = e => {
    const lat: number = e.latLng.lat();
    const lng: number = e.latLng.lng();
    const newMarker: Marker = {
      draggable: true,
      label: letters[markers.length % letters.length].toUpperCase(),
      //@ts-ignore
      labelStyle: {
        backgroundColor: "#131313",
        textAlign: "center",
        opacity: ".8",
        fontSize: "12px",
        fontFamily: "monospace",
        padding: "3px 6px",
        color: "#E4E4E4",
        borderRadius: "5px",
        textOverflow: "eclipse",
        pointerEvents: "none"
      },
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

  const deleteMarker = (id: string) => {
    const deleteIndex = markers.findIndex(mark => {
      return mark.id === id;
    });
    setMarkers([
      ...markers.slice(0, deleteIndex),
      ...markers.slice(deleteIndex + 1)
    ]);
  };

  const clearMarkerId = () => setMarkerId("");

  const updateMarkerPosition = (id: string, e) => {
    const updateIndex = markers.findIndex(mark => {
      return id === mark.id;
    });

    const lat: number = e.latLng.lat();
    const lng: number = e.latLng.lng();

    const updatedMarker: Marker = {
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

  const updateAllMarkerLabels = (id: string) => {
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
    setMarkers([...markers.slice(0, startUpdateIndex - 1), ...affectedMarkers]);
  };
  const toggleMarkerReached = (id, prevConfirmModalCb, nextConfirmModalCb) => {
    const updateIndex = markers.findIndex(mark => {
      return mark.id === id;
    });
    const prevMarker = markers[updateIndex - 1];
    const nextMarker = markers[updateIndex + 1];
    if (prevMarker !== undefined && prevMarker.hasReached === false) {
      if (prevConfirmModalCb) {
        const firstNotReachedIndex = markers.findIndex(mark => {
          return mark.hasReached === false;
        });
        prevConfirmModalCb([firstNotReachedIndex, updateIndex]);
      }
      return;
    }
    if (nextMarker !== undefined && nextMarker.hasReached === true) {
      if (nextConfirmModalCb) {
        nextConfirmModalCb([updateIndex, markers.length - 1]);
      }
      return;
    }
    const updatedMarker: Marker = {
      ...markers[updateIndex],
      hasReached: !markers[updateIndex].hasReached
    };

    setMarkers([
      ...markers.slice(0, updateIndex),
      updatedMarker,
      ...markers.slice(updateIndex + 1)
    ]);
    setActiveMarker(updatedMarker);
  };

  const clearActiveMarker = () => {
    setActiveMarker({});
  };
  return {
    //methods
    addMarker,
    deleteMarker,
    updateMarkerPosition,
    setMarkerId,
    clearMarkerId,
    updateAllMarkerLabels,
    setActiveMarker,
    clearActiveMarker,
    toggleMarkerReached,
    setMarkers,
    //state
    markers,
    activeMarker,
    markerId
  };
}
