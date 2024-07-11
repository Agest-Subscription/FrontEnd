"use client";

import TestModalV2 from "@/containers/TestGenerateField/TestModalV2";
import DashboardLayout from "./dashboard/layout";
import PopUp from "@/components/popup/Popup";

export default function Home() {
  return <PopUp popupProps={{
    popup_id: "successpopup",
    popup_text: "Are you sure to edit this pricing plan?/n This action may cause changes to other linked items.",
    popup_type: ""
  }} isOpen={true} onClose={undefined} onConfirm={undefined}  />;
}
