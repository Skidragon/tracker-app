import styled from "styled-components";
import { Button, Icon } from "antd";

const TrashWrapper = styled(Button)`
  position: absolute;
  font-size: 3em;
  height: 90px;
  width: 90px;
  bottom: 3%;
  right: 3%;
`;
const Trash = props => {
  return <TrashWrapper type={"danger"} shape={"circle"} icon={"delete"} />;
};

export default Trash;
