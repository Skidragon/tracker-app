import { Progress } from "antd";
import styled from "styled-components";

const ProgressWrapper = styled(Progress)`
  position: absolute;
  top: 3%;
  left: 3%;
  background: ${props => props.theme.white};
  border-radius: 50%;
`;

const ProgressCircle = ({ markers }) => {
  const markerCalculations = calculateForProgress(markers);
  return (
    <ProgressWrapper
      type="circle"
      percent={markerCalculations.getPercentProgress}
      strokeWidth={15}
      strokeLinecap={"square"}
      format={() => {
        return markers.length > 0
          ? `${markerCalculations.getMarkersReached} / ${markers.length}`
          : `0 / 0`;
      }}
      data-testid="progress-circle"
    />
  );
};

const calculateForProgress = markers => {
  if (markers.length === 0) {
    return 0;
  }
  let countMarkersReached = 0;
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].hasReached) {
      countMarkersReached++;
    }
  }
  return {
    getPercentProgress: Math.floor(
      (countMarkersReached / markers.length) * 100
    ),
    getMarkersReached: countMarkersReached
  };
};

export { calculateForProgress, ProgressCircle as default };
