import React, { useMemo, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { capitalize } from "lodash";

import LandingPageComponent from "./LandingPageComponent";

import PopUp from "@/components/popup/Popup";
import { LandingPageItem } from "@/interfaces/model/landingPage.type";
import { popUpPropType } from "@/interfaces/popup";

const AddMultipleItems = () => {
  const methods = useFormContext();
  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize(
      "Are you sure to change this period?\nThis action will remove your current selection.",
    )}`,
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });
  const { fields, append, remove } = useFieldArray({
    ...methods.control,
    name: "landing_page_items",
  });

  const watchedFields = useWatch({
    control: methods.control,
    name: "landing_page_items",
  });

  const usedPeriods = useMemo(() => {
    return (watchedFields || [])
      .map((field: LandingPageItem) => field?.period)
      .filter(Boolean);
  }, [watchedFields]);

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  return (
    <>
      {fields.map((item, index) => (
        <LandingPageComponent
          key={item.id}
          control={methods.control}
          index={index}
          remove={remove}
          usedPeriods={usedPeriods}
          showModal={showModal}
          setOpenModal={setOpenModal}
        />
      ))}
      {fields.length < 4 && (
        <div
          style={{
            display: "inline-block",
            color: "#379AE6",
            fontSize: "14px",
            lineHeight: "22px",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={() =>
            append({ period: "", basic: "", pro: "", premium: "" })
          }
        >
          + Add more
        </div>
      )}
      <PopUp popupProps={modalProp} isOpen={openModal} />
    </>
  );
};

export default AddMultipleItems;
