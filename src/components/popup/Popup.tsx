import { popup } from "@/interfaces/popup";
import React from "react";
import './Popup.css'


type Props = {
    popupProps: popup;
    isOpen: boolean;
    onClose: any;
};

const PopUp = ({ popupProps, isOpen = false, onClose }: Props) => {
    return (isOpen && (
        <div className="react-modal-overlay">
            <div className="react-modal-wrapper">
                <div className="react-modal-content">
                    {popupProps.popup_text}
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )

    )
}

export default PopUp;