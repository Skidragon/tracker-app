import {useState} from "react";

export default () => {
  const [isInfoWindowOpen, setInfoWindowOpen] = useState(false);

  return {
    //methods
    setInfoWindowOpen,
    //state
    isInfoWindowOpen,
  };
};
