import {useEffect, useState, MouseEvent, ReactNode} from "react";
import "./screen.less";
import {mapImageUrlGenerator} from "../helper-functions";

interface Props {
  children: ReactNode;
  lat: number;
  lng: number;
  captureWidth: string;
  captureHeight: string;
}

const ScreenCapture: React.SFC<Props> = ({
  children,
  lat,
  lng,
  captureWidth,
  captureHeight,
}) => {
  const [on, setOn] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [crossHairs, setCrossHairs] = useState({
    top: 0,
    left: 0,
  });

  const [imageURL, setImageURL] = useState("");
  const ESCAPE_KEY = 27;

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleWindowResize = () => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    setWindowSize({
      width: windowWidth,
      height: windowHeight,
    });
  };

  const handleStartCapture = () => setOn(true);

  const handleMouseMove = (e: MouseEvent) => {
    setCrossHairs({
      top: e.clientY,
      left: e.clientX,
    });
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseUp = () => {
    setOn(false);
    setIsMouseDown(false);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    mapImageUrlGenerator(
      lat,
      lng,
      captureWidth,
      captureHeight,
      "png",
      "roadmap",
      //@ts-ignore
      apiKey,
    );
  };

  const renderChild = () => {
    const props = {
      onStartCapture: handleStartCapture,
    };
    if (typeof children === "function") return children(props);
    return children;
  };

  if (!on) {
    return renderChild();
  } else {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {renderChild()}
        <div className={`overlay`} />
        <div
          className="crosshairs"
          style={{
            left: crossHairs.left + "px",
            top: crossHairs.top + "px",
          }}
        />
        <div
          className="capture-region"
          style={{
            left: crossHairs.left + "px",
            top: crossHairs.top + "px",
            width: captureWidth + "px",
            height: captureHeight + "px",
          }}
        />
      </div>
    );
  }
};

export default ScreenCapture;
