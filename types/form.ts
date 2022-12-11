import { InputUnstyledComponentsPropsOverrides, InputUnstyledOwnerState, SlotComponentProps } from "@mui/base";

export interface FormInputValidationOptions {}

export interface FormInput {
  id: string;
  label?: string;
  validationOptions?: FormInputValidationOptions;
  slotProps?: {
    root?: SlotComponentProps<"div", InputUnstyledComponentsPropsOverrides, InputUnstyledOwnerState>;
    input?: SlotComponentProps<"input", InputUnstyledComponentsPropsOverrides, InputUnstyledOwnerState>;
  };
  placeholder?: string;
  imageSrc?: string;
  width?: DialogInputWidth;
  borderType?: DialogInputBorderType;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Form {
  title?: string;
  subtitle?: string;
  inputList?: FormInput[];
}
