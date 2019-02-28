import { useState, useEffect } from "react";
import { compose, withProps, fromRenderProps } from "recompose";
import { message } from "antd";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";
import ProgressCircle from "./ProgressCircle";
import OptionsMenu from "./OptionsMenu";
import Trash from "./Trash";
import { useMarker } from "./state-and-methods/UseMarker";
import { useTrash } from "./state-and-methods/UseTrash";
import { usePolyline } from "./state-and-methods/UsePolyline";
import CustomInfoWindow from "./InfoWindow/InfoWindow";
import { useInfoWindow } from "./state-and-methods/UseInfoWindow";
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
    //Methods
    addMarker,
    deleteMarker,
    setMarkerId,
    clearMarkerId,
    updateMarkerPosition,
    updateAllMarkerLabels,
    setActiveMarker,
    clearActiveMarker,
    toggleMarkerReached,
    setMarkers,
    //State
    markers,
    activeMarker,
    markerId
  } = useMarker();
  const {
    //Methods
    enableTrash,
    disableTrash,
    setInTrashArea,
    //State
    inTrashArea,
    isTrashActive
  } = useTrash();

  const { polylines, updateLines } = usePolyline();
  const { isInfoWindowOpen, setInfoWindowOpen } = useInfoWindow();
  useEffect(() => {
    updateLines(markers);
  }, [markers]);
  return (
    <GoogleMap
      defaultZoom={6}
      onClick={e => {
        addMarker(e);
        setInfoWindowOpen(false);
      }}
      options={{
        disableDefaultUI: true
      }}
      className="map"
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {isInfoWindowOpen && (
        <CustomInfoWindow
          activeMarker={activeMarker}
          markers={markers}
          toggleMarkerReached={toggleMarkerReached}
          clearActiveMarker={clearActiveMarker}
          setInfoWindowOpen={setInfoWindowOpen}
          setMarkers={setMarkers}
          setActiveMarker={setActiveMarker}
          options={{
            pixelOffset: new google.maps.Size(0, 0, 30, 30)
          }}
        />
      )}
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
            onClick={() => {
              setMarkerId(mark.id);
              setActiveMarker(mark);
              setInfoWindowOpen(true);
            }}
            onDragStart={() => {
              setMarkerId(mark.id);
              setActiveMarker(mark);
              setInfoWindowOpen(false);
            }}
            onDrag={enableTrash}
            onDragEnd={e => {
              if (isTrashActive && inTrashArea) {
                message.info(`Marker has been deleted!`);
                deleteMarker(mark.id);
                updateAllMarkerLabels(mark.id);
                disableTrash();
                clearMarkerId();
              } else {
                updateMarkerPosition(mark.id, e);
                disableTrash();
                clearMarkerId();
              }
            }}
            className="marker"
            role="marker"
          />
        );
      })}
      {polylines.map(line => {
        return (
          <Polyline
            key={line.id}
            path={line.path}
            options={{
              strokeColor: line.strokeColor,
              strokeWeight: line.strokeWeight,
              strokeOpacity: line.strokeOpacity,
              icons: line.icons
            }}
          />
        );
      })}
    </GoogleMap>
  );
});

export default MapComponent;
