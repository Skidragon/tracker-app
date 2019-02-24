import { Menu, Dropdown, Button, Icon, Avatar, Badge } from "antd";
import styled from "styled-components";

const OptionsMenuWrapper = styled.div`
  position: absolute;
  left: 3%;
  bottom: 5%;
`;

const OptionsMenu = props => (
  <OptionsMenuWrapper>
    <Dropdown overlay={<OverlayMenu />} placement="topLeft">
      <Button type="primary" size="large">
        <Icon type="plus-circle" theme="filled" />
        Menu
      </Button>
    </Dropdown>
  </OptionsMenuWrapper>
);

//The menu that appears when OptionsMenu has been hovered
const MenuItem = styled(Menu.Item)`
  background: ${props => props.theme.white};
`;
const MainMenu = styled(Menu)`
  width: 150px;
  background: none;
  border: none;
`;
const OverlayMenu = props => (
  <MainMenu>
    <MenuItem>
      <Icon type="edit" />
      Edit
    </MenuItem>
    <MenuItem>
      <Icon type="user" />
      <Badge count={1} offset={[15, 7]}>
        Followers
      </Badge>
    </MenuItem>
    <MenuItem>
      <Icon type="link" />
      Share
    </MenuItem>
  </MainMenu>
);

export default OptionsMenu;
