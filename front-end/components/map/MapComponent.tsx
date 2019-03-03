import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { compose, withProps, fromRenderProps } from "recompose";
import { Marker as IMarker } from "./interfaces/marker.interface";
import Context from "../context/Context";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  DirectionsRenderer
} from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import ProgressCircle from "./ProgressCircle";
import OptionsMenu from "./OptionsMenu";
import SearchInput from "./SearchInput";
import Trash from "./Trash";
import { useMarker } from "./state-and-methods/UseMarker";
import { useTrash } from "./state-and-methods/UseTrash";
import { usePolyline } from "./state-and-methods/UsePolyline";
import CustomInfoWindow from "./InfoWindow/InfoWindow";
import { useInfoWindow } from "./state-and-methods/UseInfoWindow";
import { message, Spin } from "antd";
import { MapLoadingElement } from "./MapLoadingElement";

// Google Maps API doc link: https://tomchentw.github.io/react-google-maps/
const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <MapLoadingElement />,
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
    mapElement: <div style={{ height: "100%" }} className="mapElement" />
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
      <Context.Provider
        value={{
          activeMarker,
          markers,
          toggleMarkerReached,
          clearActiveMarker,
          setMarkers,
          setActiveMarker
        }}
      >
        {isInfoWindowOpen && (
          <CustomInfoWindow
            activeMarker={activeMarker}
            setInfoWindowOpen={setInfoWindowOpen}
          />
        )}
      </Context.Provider>
      <OptionsMenu />
      <ProgressCircle markers={markers} />
      <Trash
        isTrashActive={isTrashActive}
        deleteMarker={deleteMarker}
        setInTrashArea={setInTrashArea}
      />
      {markers.map((mark: IMarker) => {
        return (
          <MarkerWithLabel
            key={mark.id}
            draggable={mark.draggable}
            position={mark.position}
            //using the length and a formula to center label on the marker
            labelAnchor={new google.maps.Point(mark.label.length * 10, 30)}
            labelStyle={mark.labelStyle}
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
          >
            <div>{mark.label}</div>
          </MarkerWithLabel>
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
