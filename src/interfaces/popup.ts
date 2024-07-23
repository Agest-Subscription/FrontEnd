export type popUpPropType = {
  popup_id: string;
  popup_text?: string;
  popup_type: "Success" | "Fail" | "Confirm" | "";
  pop_up_content?: React.ReactElement;
  show_footer?: boolean;
  onConfirm: () => void;
  width?: number | string;
  onClose: any;
};
