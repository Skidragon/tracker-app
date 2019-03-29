import ScreenCapture from "../components/ScreenCapture/ScreenCapture";
import {useEffect, useState} from "react";
import "../components/ScreenCapture/screen.css";
const TestPage = () => {
  return (
    <div>s</div>
    // <ScreenCapture onEndCapture={handleScreenCapture}>
    //   {({onStartCapture}) => (
    //     <>
    //       <p>Start editing to see some magic happen :)</p>
    //       <button onClick={onStartCapture}>Capture</button>
    //       <br />
    //       <br />
    //       <img src={screenCapture} />
    //     </>
    //   )}
    // </ScreenCapture>
  );
};

export default TestPage;
