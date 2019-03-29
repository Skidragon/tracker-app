import styled from "styled-components";
const CrossHairs = styled.div`
  position: absolute;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  height: 100%;
  width: 100%;
  z-index: 2147483645;

  &::before,
  &::after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    border: none;
  }
  &::before {
    left: -100%;
    top: -100%;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  &::after {
    left: 0px;
    top: 0px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-left: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
export default CrossHairs;
