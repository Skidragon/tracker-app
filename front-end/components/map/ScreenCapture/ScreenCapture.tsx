import {useEffect, useState, useContext} from "react";
import "./screen.less";
import MapContext from "../../context/MapContext";
interface Props {
  captureWidth: string;
  captureHeight: string;
}

const ScreenCapture: React.SFC<Props> = ({
  captureWidth,
  captureHeight,
}) => {
  const {crossHairs} = useContext(MapContext);
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
};

export default ScreenCapture;
