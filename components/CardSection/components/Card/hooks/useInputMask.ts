import { useEffect } from "react";
import { FieldValues, UseFormSetValue, useWatch } from "react-hook-form";

interface useInputMaskParams {
  fieldValues: FieldValues;
  setValue: UseFormSetValue<any>;
  formatData: (data: string) => string;
}

const useInputMask = ({ fieldValues, setValue, formatData }: useInputMaskParams) => {
  const { name } = fieldValues;
  const data = useWatch(fieldValues).toString();

  useEffect(() => {
    setValue(name, formatData(data));
  }, [data]);
};

export default useInputMask;
