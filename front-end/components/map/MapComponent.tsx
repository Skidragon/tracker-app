import {useEffect, useState} from "react";
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
  useScreenCapture,
  useTrip,
} from "./state-and-methods/index";
import CustomInfoWindow from "./InfoWindow/InfoWindow";
import {message} from "antd";
import {MapLoadingElement} from "./MapLoadingElement";
import {centerMarkerLabel} from "./helper-functions/index";
import SaveTripProcess from "./SaveTripProcess/SaveTripProcess";
import StepsStatusBar from "./SaveTripProcess/StepsStatusBar";
import TripModal from "./TripManager/TripModal";
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
  const [saveTripStep, setSaveTripStep] = useState(-1);
  const {
    //state
    screenLatLng,
    isScreenOn,
    crossHairs,
    googleImageUrl,
    //methods
    setScreenOn,
    setScreenLatLng,
    onEndScreenCapture,
    setCrossHairsPosition,
  } = useScreenCapture();

  const {
    //state
    setTripModalOpen,
    //methods
    tripModalOpen,
  } = useTrip();
  useEffect(() => {
    updateLines(markers);
  }, [markers]);

  useEffect(() => {
    if (saveTripStep !== 1) {
      setScreenOn(false);
    } else {
      setScreenOn(true);
    }
  }, [saveTripStep]);
  useEffect(() => {
    window.addEventListener("mousemove", setCrossHairsPosition);
    return () => {
      window.removeEventListener("mousemove", setCrossHairsPosition);
    };
  }, []);
  useEffect(() => {
    onEndScreenCapture(400, 400);
  }, [screenLatLng]);
  return (
    <GoogleMap
      defaultZoom={6}
      onClick={e => {
        if (!isScreenOn) {
          addMarker(e);
          setInfoWindowOpen(false);
        } else {
          setScreenLatLng(e);
        }
      }}
      options={{
        disableDefaultUI: true,
      }}
      defaultCenter={{lat: -34.397, lng: 150.644}}
    >
      <StepsStatusBar
        step={saveTripStep}
        setStep={setSaveTripStep}
        googleImageUrl={googleImageUrl}
      />
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
          setScreenOn,
          isScreenOn,
          crossHairs,
          setSaveTripStep,
          setTripModalOpen,
        }}
      >
        {isInfoWindowOpen && (
          <CustomInfoWindow
            activeMarker={activeMarker}
            setInfoWindowOpen={setInfoWindowOpen}
          />
        )}
        <SaveTripProcess step={saveTripStep} />
        {isScreenOn ? null : <OptionsMenu />}
      </MapContext.Provider>
      {isScreenOn ? null : <ProgressCircle markers={markers} />}
      {isScreenOn ? null : (
        <Trash
          isTrashActive={isTrashActive}
          setInTrashArea={setInTrashArea}
        />
      )}
      <TripModal
        isModalVisible={tripModalOpen}
        setIsModalVisible={setTripModalOpen}
        trips={[]}
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
              url: mark.url,
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
              // console.log(isTrashActive, inTrashArea);
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
