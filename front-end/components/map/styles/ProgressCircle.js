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
const ProgressCircle = ({ percent }) => {
  return (
    <ProgressWrapper
      type="circle"
      percent={percent}
      strokeWidth={15}
      strokeLinecap={"square"}
      format={percent => {
        return percent + "%";
      }}
    />
  );
};

export default ProgressCircle;
