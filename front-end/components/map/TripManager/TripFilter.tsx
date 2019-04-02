import {Radio} from "antd";
import {useState} from "react";

interface Props {}

const TripFilter: React.SFC<Props> = () => {
  const [status, setStatus] = useState("active");
  const handleStatusChange = e => {
    setStatus(e.target.value);
  };
  return (
    <Radio.Group value={status} onChange={handleStatusChange}>
      <Radio.Button value="active">Active</Radio.Button>
      <Radio.Button value="archived">Archived</Radio.Button>
      <Radio.Button value="following">Following</Radio.Button>
    </Radio.Group>
  );
};

export default TripFilter;
