import { Input, Tooltip } from "antd";

interface MarkerNameInputProps {}

const MarkerNameInput: React.SFC<MarkerNameInputProps> = () => {
  const placeholderText = "Marker Label Name";
  return (
    <Tooltip trigger={["focus"]} title={placeholderText} placement="topLeft">
      <Input placeholder={placeholderText} maxLength={25} />
    </Tooltip>
  );
};

export default MarkerNameInput;
