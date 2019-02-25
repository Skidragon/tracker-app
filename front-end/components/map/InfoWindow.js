import { Checkbox, Card } from "antd";
import { InfoWindow } from "react-google-maps";
import styled from "styled-components";
import { object } from "prop-types";

const CustomInfoWindow = ({
  activeMarker,
  toggleMarkerReached,
  setInfoWindowOpen,
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
            toggleMarkerReached(activeMarker.id);
            console.log(e.target.checked);
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
