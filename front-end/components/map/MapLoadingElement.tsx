export {MapLoadingElement};

import {Spin} from "antd";

const MapLoadingElement = () => (
  <div
    style={{
      height: `100%`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    className="loadingElement"
  >
    <Spin tip="Generating Map..." size="large" />
  </div>
);
