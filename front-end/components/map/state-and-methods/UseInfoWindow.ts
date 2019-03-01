export { useInfoWindow };

import { useState } from "react";

function useInfoWindow() {
  const [isInfoWindowOpen, setInfoWindowOpen] = useState(false);

  return {
    //methods
    setInfoWindowOpen,
    //state
    isInfoWindowOpen
  };
}
