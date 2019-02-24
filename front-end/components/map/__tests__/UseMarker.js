import { render, fireEvent, cleanup } from "react-testing-library";
import MapComponent from "../MapComponent";
describe("Test Markers state", () => {
  it("adding markers", () => {
    const { container } = render(
      <MapComponent
        mapElement={<div style={{ height: `100%` }} className="mapElement" />}
      />
    );
    const map = container.firstChild;
    console.log(map);

    // console.log(markers);
  });
});
