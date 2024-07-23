export type popUpPropType = {
  popup_id: string;
  popup_text?: string;
  popup_type: "Success" | "Fail" | "Confirm" | "Info";
  pop_up_content?: React.ReactElement;
  onConfirm: () => void;
  width?: number | string;
  onClose: any;
};
