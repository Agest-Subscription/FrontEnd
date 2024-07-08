"use client";
import PopUp from "@/components/popup/Popup";
import React from "react";
import {useState} from "react";

type Props = {};

const PricingPlansPage = (props: Props) => {
  const [openModal, setOpenModal] = useState(false)
  return (
  <div><p>PricingPlansPage</p>
  <button onClick={() => setOpenModal(true)}>Open Modal</button>    
    <PopUp popupProps={{
        popup_id: "successPopup",
        popup_text: "Success",
        popup_type: "Success"
      }} isOpen={openModal} onClose={() => setOpenModal(false)} />
  </div>
  )
};

export default PricingPlansPage;
