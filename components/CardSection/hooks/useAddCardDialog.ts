import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardDialogForm, CardDialogInput } from "../../../types/card";
import { DialogAction } from "../../../types/dialog";
import useInputMask from "../components/Card/hooks/useInputMask";
import formatAmericanExpressNumber from "../helpers/format/formatAmericanExpressNumber";
import formatExpirationDate from "../helpers/format/formatExpirationDate";
import formatGeneralNumber from "../helpers/format/formatGeneralNumber";
import formatToNumeric from "../helpers/format/formatNumeric";
import useCardBrand from "./useCardBrand";

interface useAddCardDialogParams {
  addCard: (card: Card) => void;
  cardList: Card[] | null;
}

const useAddCardDialog = ({ addCard, cardList }: useAddCardDialogParams) => {
  const defaultValues = {
    number: "",
    nickname: "",
    expirationDate: "",
    csv: "",
  };

  const { control, handleSubmit, setValue, reset } = useForm<CardDialogForm>({ defaultValues: { number: "", nickname: "", expirationDate: "", csv: "" } });

  const brand = useCardBrand({ control, name: "number" });
  const formatNumber = brand === "american-express" ? formatAmericanExpressNumber : formatGeneralNumber;

  const numberInputMaskParams = { fieldValues: { control, name: "number" }, setValue, formatData: formatNumber };
  useInputMask(numberInputMaskParams);

  const expirationDateInputMaskParams = { fieldValues: { control, name: "expirationDate" }, setValue, formatData: formatExpirationDate };
  useInputMask(expirationDateInputMaskParams);

  const csvInputMaskParams = { fieldValues: { control, name: "csv" }, setValue, formatData: formatToNumeric };
  useInputMask(csvInputMaskParams);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    reset(defaultValues);
  }, [cardList]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmitAddCard: SubmitHandler<CardDialogForm> = (data) => {
    const { number, expirationDate } = data;
    const cleanData = { ...data, number: number.replaceAll(" ", ""), expirationDate: expirationDate.replaceAll(" ", "") };
    const card: Card = { ...cleanData, id: "-1", brand };
    addCard(card);
    setIsOpen(false);
  };

  const inputList: CardDialogInput[] = [
    { id: "nickname", label: "Nickname", placeholder: "Main Debit", slotProps: { input: { maxLength: 50 } } },
    {
      id: "number",
      label: "Card Number",
      placeholder: "4242 4242 4242 4242",
      slotProps: { input: { maxLength: brand === "american-express" ? 17 : 23 } },
      imageSrc: brand && `${brand}_logo.svg`,
    },
    {
      id: "expirationDate",
      label: "Exp Date",
      placeholder: "01 / 25",
      slotProps: { input: { maxLength: 7 } },
      width: "half",
      borderType: "roundRight",
    },
    {
      id: "csv",
      label: "CSV",
      placeholder: "424",
      slotProps: { input: { maxLength: 4 } },
      width: "half",
      borderType: "roundLeft",
    },
  ];

  const actionList: DialogAction[] = [
    { id: "addCardAction", type: "positive", text: "Add", handleClick: handleSubmit(onSubmitAddCard) },
    {
      id: "cancelCardAction",
      type: "neutral",
      text: "Cancel",
      handleClick: () => {
        setIsOpen(false);
      },
    },
  ];

  return { isOpen, inputList, actionList, control, setIsOpen, handleOpen, handleClose };
};

export default useAddCardDialog;
