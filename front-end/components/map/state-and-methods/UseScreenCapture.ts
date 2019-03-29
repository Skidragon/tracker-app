import {useState} from "react";
export default () => {
  const [screenCaptureImg, setScreenCaptureImg] = useState("");
  const onEndScreenCapture = (screenCaptureImg: string) => {
    setScreenCaptureImg(screenCaptureImg);
    console.log(screenCaptureImg);
  };
  return {
    //methods
    onEndScreenCapture,
    //state
    screenCaptureImg,
  };
};
