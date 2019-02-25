import { Menu, Dropdown, Button, Icon, Avatar, Badge, message } from "antd";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
const OverlayMenu = props => {
  return (
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
      <CopyToClipboard text={window.location.href}>
        <MenuItem
          onClick={() => {
            message.success("Link has been copied!");
          }}
        >
          <Icon type="link" /> Share
        </MenuItem>
      </CopyToClipboard>
    </MainMenu>
  );
};

export default OptionsMenu;
