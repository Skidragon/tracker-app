import { Checkbox, Card } from "antd";
import { InfoWindow } from "react-google-maps";
import { useState } from "react";
import styled from "styled-components";
import { object } from "prop-types";

const CustomInfoWindow = ({
  activeMarker,
  toggleMarkerReached,
  clearActiveMarker,
  setInfoWindowOpen
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
      <Card style={{ pointerEvents: "auto" }}>
        <Checkbox
          onChange={e => {
            toggleMarkerReached(activeMarker);
          }}
          checked={activeMarker.hasReached}
        >
          Checkbox
        </Checkbox>
      </Card>
    </StyledInfoWindow>
  );
};

const StyledInfoWindow = styled(InfoWindow)``;
export default CustomInfoWindow;
