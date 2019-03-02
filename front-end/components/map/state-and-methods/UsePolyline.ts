export { usePolyline };
import uuidv4 from "uuid/v4";
import { Marker, Polyline } from "../interfaces/index";
import { useState } from "react";

//Refer to lines.js for what they represent in this app
import { greyLine, solidBlackLine, dashedLine } from "../lib/lines";

const usePolyline = () => {
  const [polylines, setPolylines] = useState([]);

  const updateLines = (markers: [Marker]) => {
    const lines = [];
    let line = [];

    for (let i = 0; i < markers.length; i++) {
      let lineOptions = {};
      let markerLat = markers[i].position.lat;
      let markerLng = markers[i].position.lng;

      //store a vertex
      line.push({ lat: markerLat, lng: markerLng });
      //Once we have two vertices in the line array we can choose a line type
      if (line.length === 2) {
        //Depending on marker's status, this will choose what type of line to use
        if (markers[i - 1].hasReached === false) {
          lineOptions = {
            ...greyLine
          };
        } else if (
          markers[i - 1].hasReached === true &&
          markers[i].hasReached !== undefined &&
          markers[i].hasReached === false
        ) {
          lineOptions = {
            ...dashedLine
          };
        } else if (
          markers[i - 1].hasReached === true &&
          markers[i].hasReached !== undefined &&
          markers[i].hasReached === true
        ) {
          lineOptions = {
            ...solidBlackLine
          };
        }
      }
      //We connect our lines
      if (i > 0) {
        lineOptions["path"] = line.slice();
        lines.push({ ...lineOptions, id: uuidv4() });
        //We start at the end of the new polyline and store that vertex
        line = [{ lat: markerLat, lng: markerLng }];
      }
    }
    setPolylines(lines);
  };

  return {
    //methods
    updateLines,
    //state
    polylines
  };
};
