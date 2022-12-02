import { useEffect, useState } from "react";
import { FieldValues, UseFormSetValue, useWatch } from "react-hook-form";
import { CardBrand } from "../../../../../types/card";

const useInputMask = (fieldValues: FieldValues, setValue: UseFormSetValue<any>, formatData: (data: string) => string) => {
  const data = useWatch(fieldValues).toString();
  useEffect(() => {
    setValue(fieldValues.name, formatData(data));
  }, [data]);
};

export default useInputMask;
