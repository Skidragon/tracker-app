import { showConfirmModal } from "../antModals";
import { changeMarkersProps } from "../helper-functions/helpers";
import { Checkbox } from "antd";

const ReachedCheckbox = ({
  activeMarker,
  toggleMarkerReached,
  setMarkers,
  setActiveMarker,
  markers
}) => {
  return (
    <Checkbox
      onChange={e => {
        const prevReachedConfirm = showConfirmModal.bind(
          null,
          "Are you sure you reached this point?",
          "Previous markers will be confirmed as reached.",
          (startIndex, endIndex) => {
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
          (startIndex, endIndex) => {
            const newMarkers = changeMarkersProps(
              markers,
              { hasReached: false },
              startIndex,
              endIndex
            );
            setMarkers(newMarkers);
            setActiveMarker(newMarkers[endIndex]);
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
  );
};

export default ReachedCheckbox;
