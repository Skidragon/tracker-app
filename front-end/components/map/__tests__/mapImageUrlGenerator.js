import {mapImageUrlGenerator} from "../helper-functions/index";

describe("mapImageUrlGenerator generates an image url for a trip using the Google Static Map API", () => {
  it("Generates a map location url", () => {
    expect(
      mapImageUrlGenerator(
        34.2,
        49.33,
        400,
        500,
        "png",
        "roadmap",
        "testkey",
      ),
    ).toBe(
      "https://maps.googleapis.com/maps/api/staticmap?center=34.2,49.33&size=400x500&format=png&maptype=roadmap&key=testkey",
    );
  });
});
