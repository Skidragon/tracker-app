import React from "react";
import { render, cleanup, getNodeText } from "react-testing-library";
import { changeMarkersProps } from "../helper-functions/helpers";
import { markers } from "../dummy-data/markers";

afterEach(cleanup);

describe("Testing helper functions that are not related to state and don't change it.", () => {
  it("changeMarkerProps is immutable", () => {
    const markersCopy = markers.slice();
    changeMarkersProps(markers, { hasReached: true }, 0, 2);

    expect(markers).toMatchObject(markersCopy);
  });
  it("changes the specified markers' by given indexes", () => {
    const reachedChange0to1 = changeMarkersProps(
      markers,
      { hasReached: true },
      0,
      1
    );
    expect(reachedChange0to1[0].hasReached).toBeTruthy();
    expect(reachedChange0to1[1].hasReached).toBeTruthy();
    expect(reachedChange0to1[2].hasReached).toBeFalsy();

    const reachedChange2to0 = changeMarkersProps(
      markers,
      { hasReached: true },
      2,
      0
    );

    expect(reachedChange2to0[0].hasReached).toBeTruthy();
    expect(reachedChange2to0[1].hasReached).toBeTruthy();
    expect(reachedChange2to0[2].hasReached).toBeTruthy();
    expect(reachedChange2to0[3].hasReached).toBeFalsy();
  });
});
