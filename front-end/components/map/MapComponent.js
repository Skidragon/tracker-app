import { useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import uuidv4 from "uuid/v4";
import ProgressCircle from "./styles/ProgressCircle";
import OptionsMenu from "./styles/OptionsMenu";
import Trash from "./styles/Trash";
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
  const { markers, addMarker, deleteMarker } = useMarker();
  return (
    <GoogleMap
      defaultZoom={6}
      onClick={addMarker}
      options={{
        disableDefaultUI: true
      }}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <OptionsMenu />
      <ProgressCircle markers={markers} />
      <Trash onHover={deleteMarker} />
      {markers.map(mark => {
        return (
          <Marker
            key={mark.id}
            draggable={mark.draggable}
            position={mark.position}
            label={mark.label}
          />
        );
      })}
    </GoogleMap>
  );
});

function useMarker(e) {
  const [markers, setMarkers] = useState([]);

  const addMarker = e => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newMarker = {
      draggable: true,
      label: "a",
      id: uuidv4(),
      position: {
        lat,
        lng
      },
      hasReached: false
    };
    // console.log(markers);
    setMarkers([...markers, newMarker]);
  };

  const deleteMarker = () => {};
  return { markers, addMarker, deleteMarker };
}
export default MapComponent;
