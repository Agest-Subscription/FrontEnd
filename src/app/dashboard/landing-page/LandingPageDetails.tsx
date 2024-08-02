import React from "react";
import { Flex } from "antd";

import LandingPageForm from "./LandingPageForm";

import ButtonV1 from "@/components/button/CustomButton";
import { useGoToDashboardTab } from "@/utils/navigate";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onSave: any;
}

const LandingPageDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onSave,
}) => {
  const goToLandingPage = useGoToDashboardTab("landing-page");
  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <LandingPageForm onSave={onSave} />
      </Flex>
      <Flex
        style={{ width: "100%" }}
        justify={`${edit ? "space-between" : "flex-end"}`}
      >
        <Flex gap={12}>
          <ButtonV1
            title="Cancel"
            customType="cancel"
            onClick={() => goToLandingPage()}
          />
          <ButtonV1
            title="Save"
            onClick={onSave}
            customDisabled={disableSaveBtn}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default LandingPageDetails;
