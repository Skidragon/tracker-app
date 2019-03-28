import {useContext} from "react";

import {showConfirmModal} from "../antModals";
import {changeMarkersProps} from "../helper-functions/changeMarkerProps";
import {Checkbox} from "antd";
//@ts-ignore
import {Marker} from "../interfaces/marker.interface";
import MapContext from "../../context/MapContext";
type ContextTypes = {
  markers: [Marker];
  setMarkers: any;
  setActiveMarker: any;
  toggleMarkerReached: any;
  activeMarker: Marker;
};
const ReachedCheckbox = () => {
  const {
    markers,
    setMarkers,
    setActiveMarker,
    toggleMarkerReached,
    activeMarker,
  }: ContextTypes = useContext(MapContext);
  return (
    <Checkbox
      onChange={() => {
        const prevReachedConfirm = showConfirmModal.bind(
          null,
          "Are you sure you reached this point?",
          "Previous markers will be confirmed as reached.",
          (startIndex: number, endIndex: number) => {
            const newMarkers = changeMarkersProps(
              markers,
              {hasReached: true},
              startIndex,
              endIndex,
            );
            setMarkers(newMarkers);
            setActiveMarker(newMarkers[endIndex]);
          },
        );
        const nextReachedConfirm = showConfirmModal.bind(
          null,
          "Are you sure you want to backtrack?",
          "Markers ahead of this location will be marked as not reached.",
          (startIndex: number, endIndex: number) => {
            const newMarkers = changeMarkersProps(
              markers,
              {hasReached: false},
              startIndex,
              endIndex,
            );
            setMarkers(newMarkers);
            setActiveMarker(newMarkers[startIndex]);
          },
        );
        toggleMarkerReached(
          activeMarker.id,
          prevReachedConfirm,
          nextReachedConfirm,
        );
        // console.log(e.target.checked);
      }}
      checked={activeMarker.hasReached}
    >
      Reached Destination?
    </Checkbox>
  );
};

export default ReachedCheckbox;
