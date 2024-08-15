import React from "react";

const AddMultipleItems = () => {
  return (
    <>
      <div
        style={{
          display: "inline-block",
          color: "#379AE6",
          fontSize: "14px",
          lineHeight: "22px",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log("add more");
        }}
      >
        + Add more
      </div>
      {/* <PopUp popupProps={modalProp} isOpen={openModal} /> */}
    </>
  );
};

export default AddMultipleItems;
