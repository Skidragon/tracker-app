import ScreenCapture from "../ScreenCapture/ScreenCapture";

interface Props {
  step: number;
}

const SaveTripProcess: React.SFC<Props> = ({step}) => {
  if (step < 1) {
    return null;
  } else if (step === 1) {
    return <ScreenCapture captureHeight={"400"} captureWidth={"400"} />;
  } else if (step === 2) {
    return <div>WIP</div>;
  }
};

export default SaveTripProcess;
