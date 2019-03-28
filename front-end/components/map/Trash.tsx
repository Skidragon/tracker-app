import styled from "styled-components";
import {Button, Icon} from "antd";
// import DeleteTooltip from "./styles/DeleteTooltip";

type PropTypes = {
  isTrashActive: boolean;
  setInTrashArea: any;
};
//@ts-ignore
const TrashWrapper = styled(Button)`
  position: absolute;
  font-size: 3em;
  height: 90px;
  width: 90px;
  bottom: 3%;
  right: 3%;
`;

const Trash: React.SFC<PropTypes> = ({isTrashActive, setInTrashArea}) => {
  return (
    <TrashWrapper
      type={"danger"}
      shape={"circle"}
      icon={"delete"}
      disabled={!isTrashActive}
      onMouseEnter={() => setInTrashArea(true)}
      onMouseLeave={() => setInTrashArea(false)}
    />
  );
};

export default Trash;
