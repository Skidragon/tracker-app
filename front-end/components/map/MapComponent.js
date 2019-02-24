import { useState } from "react";
import { compose, withProps, fromRenderProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import ProgressCircle from "./styles/ProgressCircle";
import OptionsMenu from "./styles/OptionsMenu";
import Trash from "./styles/Trash";
import { useMarker } from "./state-and-methods/UseMarker";
import { useTrash } from "./state-and-methods/UseTrash";

// Google Maps API doc link: https://tomchentw.github.io/react-google-maps/
const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: (
      <div style={{ height: `100%` }} className="loadingElement" />
    ),
    containerElement: (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%"
        }}
        className="containerElement"
      />
    ),
    mapElement: <div style={{ height: `100%` }} className="mapElement" />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const {
    markers,
    addMarker,
    deleteMarker,
    setMarkerId,
    clearMarkerId
  } = useMarker();
  const {
    isTrashActive,
    enableTrash,
    disableTrash,
    inTrashArea,
    setInTrashArea
  } = useTrash();
  return (
    <GoogleMap
      defaultZoom={6}
      onClick={addMarker}
      options={{
        disableDefaultUI: true
      }}
      className="map"
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <OptionsMenu />
      <ProgressCircle markers={markers} />
      <Trash
        isTrashActive={isTrashActive}
        deleteMarker={deleteMarker}
        setInTrashArea={setInTrashArea}
      />
      {markers.map(mark => {
        return (
          <Marker
            key={mark.id}
            draggable={mark.draggable}
            position={mark.position}
            label={mark.label}
            onDragStart={() => setMarkerId(mark.id)}
            onDrag={enableTrash}
            onDragEnd={() => {
              if (isTrashActive && inTrashArea) {
                deleteMarker(mark.id);
              }
              disableTrash();
              clearMarkerId();
            }}
            className="marker"
            role="marker"
          />
        );
      })}
    </GoogleMap>
  );
});

export default MapComponent;
