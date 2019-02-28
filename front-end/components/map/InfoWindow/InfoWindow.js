import { Card } from "antd";
import { InfoWindow } from "react-google-maps";
import styled from "styled-components";
import ReachedCheckbox from "./ReachedCheckbox";
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
        <ReachedCheckbox
          toggleMarkerReached={toggleMarkerReached}
          setMarkers={setMarkers}
          setActiveMarker={setActiveMarker}
          markers={markers}
          activeMarker={activeMarker}
        />
      </Card>
    </StyledInfoWindow>
  );
};

const StyledInfoWindow = styled(InfoWindow)``;
export default CustomInfoWindow;
