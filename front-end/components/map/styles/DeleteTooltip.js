import { Tooltip } from "antd";
import styled from "styled-components";
const TooltipContent = styled.div`
  background: ${props => props.theme.red};
  color: ${props => props.theme.white};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;
const DeleteTooltip = props => {
  return (
    <Tooltip placement="top" title={"Delete Marker?"}>
      {props.children}
    </Tooltip>
  );
};

export default DeleteTooltip;
