import { showConfirmModal } from "../antModals";
import { changeMarkersProps } from "../helper-functions/helpers";
import { Checkbox } from "antd";
//@ts-ignore
import { Marker } from "../interfaces/marker.interface";
import Context from "../../context/Context";

type PropTypes = {
  markers: [Marker];
  setMarkers: any;
  setActiveMarker: any;
  toggleMarkerReached: any;
  activeMarker: Marker;
};
const ReachedCheckbox = () => {
  return (
    <Context.Consumer>
      {({
        markers,
        setMarkers,
        setActiveMarker,
        toggleMarkerReached,
        activeMarker
      }: PropTypes) => (
        <Checkbox
          onChange={e => {
            const prevReachedConfirm = showConfirmModal.bind(
              null,
              "Are you sure you reached this point?",
              "Previous markers will be confirmed as reached.",
              (startIndex: number, endIndex: number) => {
                const newMarkers = changeMarkersProps(
                  markers,
                  { hasReached: true },
                  startIndex,
                  endIndex
                );
                setMarkers(newMarkers);
                setActiveMarker(newMarkers[endIndex]);
              }
            );
            const nextReachedConfirm = showConfirmModal.bind(
              null,
              "Are you sure you want to backtrack?",
              "Markers ahead of this location will be marked as not reached.",
              (startIndex: number, endIndex: number) => {
                const newMarkers = changeMarkersProps(
                  markers,
                  { hasReached: false },
                  startIndex,
                  endIndex
                );
                setMarkers(newMarkers);
                setActiveMarker(newMarkers[startIndex]);
              }
            );
            toggleMarkerReached(
              activeMarker.id,
              prevReachedConfirm,
              nextReachedConfirm
            );
            // console.log(e.target.checked);
          }}
          checked={activeMarker.hasReached}
        >
          Reached Destination?
        </Checkbox>
      )}
    </Context.Consumer>
  );
};

export default ReachedCheckbox;
