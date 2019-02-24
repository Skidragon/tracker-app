export { useTrash };

import { useState } from "react";
const useTrash = () => {
  const [isTrashActive, setEnabled] = useState(false);

  const disableTrash = () => setEnabled(false);

  const enableTrash = () => setEnabled(true);

  const [inTrashArea, setInTrashArea] = useState(false);

  return {
    isTrashActive,
    disableTrash,
    enableTrash,
    inTrashArea,
    setInTrashArea
  };
};
