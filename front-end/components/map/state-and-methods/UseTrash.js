export { useTrash };

import { useState } from "react";
const useTrash = () => {
  const [isTrashActive, setEnabled] = useState(false);

  const disableTrash = () => setEnabled(false);

  const enableTrash = () => setEnabled(true);

  return { isTrashActive, disableTrash, enableTrash };
};
