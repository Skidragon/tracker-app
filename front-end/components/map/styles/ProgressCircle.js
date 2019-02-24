import { Progress } from "antd";
import styled from "styled-components";

const ProgressWrapper = styled(Progress)`
  position: absolute;
  top: 3%;
  left: 3%;
  background: ${props => props.theme.white};
  border-radius: 50%;
`;
const InsideCircle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: red;
`;
const ProgressCircle = ({ markers }) => {
  return (
    <ProgressWrapper
      type="circle"
      percent={calculatePercent(markers)}
      strokeWidth={15}
      strokeLinecap={"square"}
      format={percent => {
        return `0 / ${markers.length}`;
      }}
    />
  );
};

const calculatePercent = markers => {
  if (markers.length === 0) {
    return 0;
  }
  let countCompleted = 0;
  for (let i = 0; i < markers.length; i++) {
    if (markers.hasReached) {
      countCompleted++;
    }
  }
  return Math.floor((countCompleted / markers.length) * 100);
};

export default ProgressCircle;
