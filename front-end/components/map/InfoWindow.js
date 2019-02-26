import { Checkbox, Card, Modal } from "antd";
import { showConfirmModal } from "./antModals";
import { InfoWindow } from "react-google-maps";
import styled from "styled-components";
import { changeMarkersProps } from "./helper-functions/helpers";
const CustomInfoWindow = ({
  activeMarker,
  toggleMarkerReached,
  setInfoWindowOpen,
  setMarkers,
  setActiveMarker,
  markers
}) => {
  const position =
    activeMarker.position !== undefined
      ? activeMarker.position
      : { lat: 0, lng: 0 };
  return (
    <StyledInfoWindow
      position={{ lat: position.lat, lng: position.lng }}
      activeMarker={activeMarker}
      onCloseClick={() => {
        setInfoWindowOpen(false);
      }}
    >
      <Card>
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
      </Card>
    </StyledInfoWindow>
  );
};

const StyledInfoWindow = styled(InfoWindow)``;
export default CustomInfoWindow;
