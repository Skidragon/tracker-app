import { Button, Card } from "antd";
import { InfoWindow, GoogleMap } from "react-google-maps";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import ReachedCheckbox from "./ReachedCheckbox";
import MarkerNameInput from "./MarkerNameInput";
import ArrivalDatePicker from "./ArrivalDatePicker";

const CustomInfoWindow = ({ activeMarker, setInfoWindowOpen }) => {
  const position =
    activeMarker.position !== undefined
      ? activeMarker.position
      : { lat: 0, lng: 0 };
  return (
    <StyledInfoWindow
      position={{ lat: position.lat, lng: position.lng }}
      options={{
        pixelOffset: new google.maps.Size(0, -60),
        disableAutoPan: false
      }}
      activeMarker={activeMarker}
    >
      <>
        <ExitBtn
          type="danger"
          onClick={() => {
            setInfoWindowOpen(false);
          }}
        >
          Close
        </ExitBtn>
        <StyledCard
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            padding: "0",
            marginTop: "32px"
          }}
        >
          <CardGrid style={{ border: "none" }}>
            <MarkerNameInput />
          </CardGrid>
          <CardGrid>
            <ArrivalDatePicker />
          </CardGrid>
          <CardGrid>
            <ReachedCheckbox />
          </CardGrid>
        </StyledCard>
      </>
    </StyledInfoWindow>
  );
};
const StyledCard = styled(Card)`
  .ant-card-bordered {
    border: none;
  }
`;
const ExitBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
  border-top-left-radius: 0;
`;
const CardGrid = styled(Card.Grid)`
  width: 100%;
  margin: 0;
  .ant-card-grid:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;
const StyledInfoWindow = styled(InfoWindow)`
  position: relative;
  margin: 0;
  min-width: 1000px;
`;
export default CustomInfoWindow;
