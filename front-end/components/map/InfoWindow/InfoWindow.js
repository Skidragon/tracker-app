import { Card } from "antd";
import { InfoWindow } from "react-google-maps";
import styled from "styled-components";
import ReachedCheckbox from "./ReachedCheckbox";
const CustomInfoWindow = ({ activeMarker, setInfoWindowOpen }) => {
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
        <ReachedCheckbox />
      </Card>
    </StyledInfoWindow>
  );
};

const StyledInfoWindow = styled(InfoWindow)``;
export default CustomInfoWindow;
