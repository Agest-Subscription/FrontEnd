import React from "react";
import { useEffect } from "react";
import { Modal, Button } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { popup } from "@/interfaces/popup";

type Props = {
    popupProps: popup;
    isOpen: boolean;
    onClose: any;
    onConfirm: any
};

//3 popup types "Success", "Fail", "Confirm"
const PopUp = ({ popupProps, isOpen = false, onClose, onConfirm }: Props) => {

    const handleEscape = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            onClose();
        }
    }

    useEffect(() => {
        return () => document.addEventListener('keydown', handleEscape);
    })

    return (
        <>
            <Modal
                open={isOpen}
                onOk={onConfirm}
                onCancel={onClose}
                title={
                popupProps.popup_type === "Success"? [
                    <center><CheckCircleOutlined style={{fontSize:'30px', color:'yellow'}}/></center>
                ] 
                : popupProps.popup_type === "Fail"? [
                    <center><ExclamationCircleOutlined style={{fontSize:'30px', color:'red'}}/></center>
                ] : []
                }

                footer={
                    popupProps.popup_type === "Confirm" && [
                        <><Button key="cancel" onClick={onClose}>No</Button><Button key="confirm" type="primary" onClick={onConfirm}>Yes</Button></>
                    ]
                }
            >
                <center><p>{popupProps.popup_text}</p></center>
            </Modal>
        </>
    )
}

export default PopUp;