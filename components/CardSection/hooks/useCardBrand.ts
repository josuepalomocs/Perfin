import { FieldValues, useWatch } from "react-hook-form";
import { CardBrand } from "../../../types/card";

const useCardBrand = (fieldValues: FieldValues): CardBrand => {
  const MIINumber = useWatch(fieldValues).toString().charAt(0);

  switch (MIINumber) {
    case "3":
      return "american-express";
    case "4":
      return "visa";
    case "5":
      return "mastercard";
    case "6":
      return "discover";
  }

  return "";
};

export default useCardBrand;
