import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import ProgressCircle from "./styles/ProgressCircle";
const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%"
        }}
      />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={6}
      options={{
        disableDefaultUI: true
      }}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <ProgressCircle percent={50} />
      <Marker draggable={true} position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  );
});

export default MapComponent;
