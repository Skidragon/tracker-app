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
)(() => {
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
      <Trash isTrashActive={isTrashActive} setInTrashArea={setInTrashArea} />
      {markers.map(mark => {
        return (
          <MarkerWithLabel
            key={mark.id}
            draggable={mark.draggable}
            position={mark.position}
            //using the length and a formula to center label on the marker
            labelAnchor={new google.maps.Point(mark.label.length * 10, 50)}
            labelStyle={mark.labelStyle}
            icon={{
              origin: new google.maps.Point(0, 0),
              url:
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMDEgMTUyIiBmaWxsPSJu%0D%0Ab25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDguMDE1%0D%0AOSAxNDcuMzE5TDEyLjQ4ODIgOTcuMzE2OEMxMC42MDY0IDk0LjY2ODMgMTIuNSA5MSAxNS43NDg5%0D%0AIDkxSDg1LjQyNDVDODguNjM5NiA5MSA5MC41NDA5IDk0LjYwMDggODguNzI3NyA5Ny4yNTU4TDU0%0D%0ALjU3OTggMTQ3LjI1OEM1My4wMDk0IDE0OS41NTggNDkuNjI4NyAxNDkuNTg5IDQ4LjAxNTkgMTQ3%0D%0ALjMxOVoiIGZpbGw9IiM5Njk2OTYiIHN0cm9rZT0iIzJCMkIyQiIvPgo8cGF0aCBkPSJNMTAwLjUg%0D%0ANTAuNVY5MEMxMDAuNSA5My4wMzc2IDk4LjAzNzYgOTUuNSA5NSA5NS41SDZDMi45NjI0MyA5NS41%0D%0AIDAuNSA5My4wMzc2IDAuNSA5MFY1MC41QzAuNSAyMi44ODU4IDIyLjg4NTggMC41IDUwLjUgMC41%0D%0AQzc4LjExNDIgMC41IDEwMC41IDIyLjg4NTggMTAwLjUgNTAuNVoiIGZpbGw9IiM5Njk2OTYiIHN0%0D%0Acm9rZT0iIzEzMTMxMyIvPgo8cGF0aCBkPSJNMTAgNTBDMTAgMjguNDYwOSAyNy40NjA5IDExIDQ5%0D%0AIDExSDUyQzczLjUzOTEgMTEgOTEgMjguNDYwOSA5MSA1MFY1MEM5MSA3MS41MzkxIDczLjUzOTEg%0D%0AODkgNTIgODlINDlDMjcuNDYwOSA4OSAxMCA3MS41MzkxIDEwIDUwVjUwWiIgZmlsbD0iIzJBMkQy%0D%0AOSIvPgo8L3N2Zz4K"
            }}
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
