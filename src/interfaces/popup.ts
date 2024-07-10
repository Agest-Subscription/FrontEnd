export type popUpPropType = {
  popup_id: string;
  popup_text: string;
  popup_type: "Success" | "Fail" | "Confirm" | "";
  onConfirm: () => void;
};
