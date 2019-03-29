import React from "react";
import {render, cleanup, getNodeText} from "react-testing-library";
import ProgressCircle, {calculateForProgress} from "../ProgressCircle";

afterEach(cleanup);

describe("<ProgressCircle /> tests", () => {
  it("tests the calculatePercent function", () => {
    const markers = [{hasReached: false}, {hasReached: false}];
    expect(calculateForProgress(markers).getPercentProgress).toBe(0);
    expect(calculateForProgress(markers).getMarkersReached).toBe(0);

    markers[0].hasReached = true;
    expect(calculateForProgress(markers).getPercentProgress).toBe(50);
    expect(calculateForProgress(markers).getMarkersReached).toBe(1);

    markers.push({hasReached: false});
    expect(calculateForProgress(markers).getPercentProgress).toBe(33);
    expect(calculateForProgress(markers).getMarkersReached).toBe(1);
  });

  it("tests format prop", () => {
    const {getByTestId, rerender} = render(
      <ProgressCircle
        markers={[{hasReached: true}, {hasReached: false}]}
      />,
    );
    expect(getByTestId("progress-circle").textContent).toBe("1 / 2");

    rerender(
      <ProgressCircle
        markers={[{hasReached: true}, {hasReached: true}]}
      />,
    );
    expect(getByTestId("progress-circle").textContent).toBe("2 / 2");

    rerender(<ProgressCircle markers={[{hasReached: true}]} />);
    expect(getByTestId("progress-circle").textContent).toBe("1 / 1");

    rerender(<ProgressCircle markers={[]} />);
    expect(getByTestId("progress-circle").textContent).toBe("0 / 0");
  });
});
