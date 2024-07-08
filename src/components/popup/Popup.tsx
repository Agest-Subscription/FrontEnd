import { popup } from "@/interfaces/popup";
import { useSpring, animated, useTransition } from '@react-spring/web';
import React from "react";
import './Popup.css'
import { useEffect } from "react";
import { size } from "lodash";


type Props = {
    popupProps: popup;
    isOpen: boolean;
    onClose: any;
};

const PopUp = ({ popupProps, isOpen = false, onClose }: Props) => {
   
    const handleEscape = (e: KeyboardEvent) => {
        if(e.keyCode === 27){
            onClose();
        }
    }

    useEffect(() => {
       return () => document.addEventListener('keydown', handleEscape);
    })

    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 1},
        config: {
            duration: 300
        }
    })
    const springs = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
           duration: 300 
        }
    })
    
    return modalTransition((styles, isOpen) => isOpen && (
        <animated.div style={styles} className="react-modal-overlay">
            <animated.div style={springs} className="react-modal-wrapper">
                <div className="react-modal-content">
                    <div className="react-modal-header">
                        <h2>{popupProps.popup_type}</h2>
                        <button onClick={onClose} className="close" aria-label="Close modal"></button>
                    </div>
                    <div className="react-modal-body">
                        {popupProps.popup_text}
                    </div>
                    <div className="react-modal-footer">
                        <button type="button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </animated.div>
        </animated.div>
    ))
}

export default PopUp;