import styled from "styled-components";

const CaptureRegion = styled.div`
  position: fixed;
  z-index: 10000000;
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.4);
`;

export default CaptureRegion;
