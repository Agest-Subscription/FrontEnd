import React from "react";
import { Control, FieldValues, UseFieldArrayRemove } from "react-hook-form";
import { Col, Flex, Row } from "antd";

import { popUpPropType } from "@/interfaces/popup";

type Props = {
  control: Control<FieldValues, any>;
  index: number;
  remove: UseFieldArrayRemove;
  usedPeriods: string[];
  showModal: (popUpProp: popUpPropType) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActivityComponent = ({
  control,
  index,
  remove,
  usedPeriods,
  showModal,
  setOpenModal,
}: Props) => {
  return <Flex vertical gap={24}>
    <Row gutter={24}>
      <Col></Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
    </Row>
  </Flex>;
};

export default ActivityComponent;
