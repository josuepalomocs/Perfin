import { InputUnstyledComponentsPropsOverrides, InputUnstyledOwnerState, SlotComponentProps } from "@mui/base";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { CardDialogInput, CardDialogForm } from "./card";

export type DialogType = "prompt" | "form";

export interface DialogInput {
  id: string;
  label?: string;
  slotProps?: {
    root?: SlotComponentProps<"div", InputUnstyledComponentsPropsOverrides, InputUnstyledOwnerState>;
    input?: SlotComponentProps<"input", InputUnstyledComponentsPropsOverrides, InputUnstyledOwnerState>;
  };
  placeholder?: string;
  imageSrc?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DialogAction {
  id?: string;
  text?: string;
  handleClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface Dialog {
  open?: boolean;
  handleClose?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: DialogType;
  title?: string;
  message?: string;
  inputList?: CardDialogInput[];
  actionList?: DialogAction[];
  control?: Control<CardDialogForm, any>;
}
