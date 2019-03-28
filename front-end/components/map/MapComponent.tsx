import {useEffect} from "react";
import {compose, withProps} from "recompose";
import {
  Marker as IMarker,
  Polyline as IPolyline,
  MapEvent,
} from "./interfaces/index";
import MapContext from "../context/MapContext";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
} from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import ProgressCircle from "./ProgressCircle";
import OptionsMenu from "./OptionsMenu";
import Trash from "./Trash";
import {
  useMarker,
  useTrash,
  usePolyline,
  useInfoWindow,
} from "./state-and-methods/index";
import CustomInfoWindow from "./InfoWindow/InfoWindow";
import {message} from "antd";
import {MapLoadingElement} from "./MapLoadingElement";
import {GREY_PIN, CHECKED_PIN} from "./map-icons/markerIcons";
import {centerMarkerLabel} from "./helper-functions/index";
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
          width: "100%",
        }}
        className="containerElement"
      />
    ),
    mapElement: <div style={{height: "100%"}} className="mapElement" />,
  }),
  withScriptjs,
  withGoogleMap,
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
    updateMarkerLabelName,
    setMarkerDate,
    //State
    markers,
    activeMarker,
    markerId,
  } = useMarker();
  const {
    //Methods
    enableTrash,
    disableTrash,
    setInTrashArea,
    //State
    inTrashArea,
    isTrashActive,
  } = useTrash();
  const {polylines, updateLines} = usePolyline();
  const {isInfoWindowOpen, setInfoWindowOpen} = useInfoWindow();
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
        disableDefaultUI: true,
      }}
      defaultCenter={{lat: -34.397, lng: 150.644}}
    >
      <MapContext.Provider
        value={{
          activeMarker,
          markers,
          toggleMarkerReached,
          clearActiveMarker,
          setMarkers,
          setActiveMarker,
          updateMarkerLabelName,
          setMarkerDate,
        }}
      >
        {isInfoWindowOpen && (
          <CustomInfoWindow
            activeMarker={activeMarker}
            setInfoWindowOpen={setInfoWindowOpen}
          />
        )}
      </MapContext.Provider>
      <OptionsMenu />
      <ProgressCircle markers={markers} />
      <Trash
        isTrashActive={isTrashActive}
        setInTrashArea={setInTrashArea}
      />
      {markers.map((mark: IMarker) => {
        return (
          <MarkerWithLabel
            key={mark.id}
            draggable={mark.draggable}
            position={mark.position}
            //using the length and a formula to center label on the marker
            labelAnchor={
              new google.maps.Point(
                centerMarkerLabel(mark.label.length),
                26,
              )
            }
            labelStyle={mark.labelStyle}
            icon={{
              origin: new google.maps.Point(0, 0),
              url: `${mark.hasReached ? CHECKED_PIN : GREY_PIN}`,
              scaledSize: new google.maps.Size(40, 60),
            }}
            date={mark.date}
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
            onDragEnd={(e: MapEvent) => {
              console.log(isTrashActive, inTrashArea);
              if (isTrashActive && inTrashArea) {
                message.info(`Marker has been deleted!`);
                deleteMarker(mark.id);
                updateAllMarkerLabels(mark.id);
                disableTrash();
                setInTrashArea(false);
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
      {polylines.map((line: IPolyline) => {
        return (
          <Polyline
            key={line.id}
            path={line.path}
            options={{
              strokeColor: line.strokeColor,
              strokeWeight: line.strokeWeight,
              strokeOpacity: line.strokeOpacity,
              icons: line.icons,
            }}
          />
        );
      })}
    </GoogleMap>
  );
});

export default MapComponent;
