import {useState} from "react";
export default () => {
  const [isTrashActive, setEnabled] = useState(false);

  const disableTrash = () => setEnabled(false);

  const enableTrash = () => setEnabled(true);

  const [inTrashArea, setInTrashArea] = useState(false);

  return {
    //methods
    disableTrash,
    enableTrash,
    setInTrashArea,

    //state
    inTrashArea,
    isTrashActive,
  };
};
