import { useState } from "react";

const useCard = () => {
  const [isDataRevealed, setIsDataRevealed] = useState(false);

  return { isDataRevealed, setIsDataRevealed };
};

export default useCard;
