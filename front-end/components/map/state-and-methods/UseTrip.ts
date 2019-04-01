import {useState} from "react";
export default () => {
  const [tripModalOpen, setTripModalOpen] = useState();

  return {
    //methods
    setTripModalOpen,
    //state
    tripModalOpen,
  };
};
