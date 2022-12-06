import { useState } from "react";

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return { handleClose };
};

export default useDialog;
