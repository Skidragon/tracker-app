import {useEffect, useState} from "react";
import "./screen.less";

interface Props {
  captureWidth: string;
  captureHeight: string;
  isScreenOn: boolean;
  crossHairs: {
    top: number;
    left: number;
  };
}

const ScreenCapture: React.SFC<Props> = ({
  captureWidth,
  isScreenOn,
  captureHeight,
  crossHairs,
}) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

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

  if (isScreenOn) {
    return (
      <>
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
      </>
    );
  } else {
    return null;
  }
};

export default ScreenCapture;
