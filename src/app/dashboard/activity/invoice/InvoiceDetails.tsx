// import React, { FC, useEffect } from "react";
// import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
// import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
// import { Col, Flex, Row, Tooltip, Typography } from "antd";

// import ButtonV1 from "@/components/button/CustomButton";
// import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
// import { ActivityFormValues } from "@/interfaces/model/activity.type";
// import { useGoToDashboardTab } from "@/utils/navigate";

// type DetailsProp = {
//   edit?: boolean;
//   disableSaveBtn?: boolean;
//   onDelete?: any;
//   onSave: any;
//   methods: UseFormReturn<ActivityFormValues, any>;
// };

// type ActivityItemProps = {
//   onDelete: () => void;
//   index: number;
//   showDelete: boolean;
// };

// const ActivityItemField: FC<ActivityItemProps> = ({
//   index,
//   onDelete,
//   showDelete,
// }) => {
//   const { FormField } = useFormWrapperCtx<ActivityFormValues>();

//   return (
//     <>
//       <Row gutter={24} key={index}>
//         <Col span={4}>
//           <FormField
//             name={"activity_item.[].user"}
//             index={[index]}
//             key={index + "price"}
//           />
//         </Col>
//         <Col span={4}>
//           <FormField
//             name={"activity_item.[].subscription"}
//             index={[index]}
//             key={index + "threshold"}
//           />
//         </Col>
//         <Col span={4}>
//           <FormField
//             name={"activity_item.[].subs_start_date"}
//             index={[index]}
//             key={index + "threshold"}
//           />
//         </Col>
//         <Col span={4}>
//           <FormField
//             name={"activity_item.[].subs_end_date"}
//             index={[index]}
//             key={index + "threshold"}
//           />
//         </Col>
//         <Col span={4}>
//           <FormField
//             name={"activity_item.[].pricing_plan"}
//             index={[index]}
//             key={index + "threshold"}
//           />
//         </Col>

//         {showDelete && (
//           <Col
//             style={{
//               paddingLeft: 0,
//               paddingRight: 0,
//               paddingTop: "34px",
//             }}
//           >
//             <DeleteOutlined
//               style={{
//                 fontSize: 24,
//                 color: "#263e56",
//               }}
//               onClick={onDelete}
//             />
//           </Col>
//         )}
//       </Row>
//     </>
//   );
// };

// export default function ActivityDetails({
//   edit = false,
//   disableSaveBtn = false,
//   onDelete,
//   onSave,
// }: DetailsProp) {
//   const goToActivity = useGoToDashboardTab("activity");
//   const { FormField } = useFormWrapperCtx<ActivityFormValues>();
//   const methodsArr = useFormContext<ActivityFormValues>();

//   const { fields, append, remove } = useFieldArray({
//     control: methodsArr.control,
//     name: "activity_item",
//   });

//   const newActivityItemsArray = React.useMemo(
//     () => ({
//       user: null,
//       subscription: null,
//       subs_start_date: null,
//       subs_end_date: null,
//       pricing_plan: null,
//     }),
//     [],
//   );

//   const handleAddMoreClick = () => {
//     append({ ...newActivityItemsArray });
//   };

//   const handleDelete = (index: number) => {
//     remove(index);
//   };

//   return (
//     <>
//       <Flex
//         vertical
//         gap={24}
//         style={{ border: "1px solid #BDC1CA", padding: "16px" }}
//       >
//         <Row gutter={16}>
//           <Col span={8}>
//             <FormField name="description" />
//           </Col>
//         </Row>
//         <>
//           {fields.map((item, index) => (
//             <>
//               <ActivityItemField
//                 key={item.id}
//                 index={index}
//                 onDelete={() => handleDelete(index)}
//                 showDelete={fields.length > 1}
//               />
//             </>
//           ))}
//           <Typography
//             style={{
//               cursor: "pointer",
//               color: "#15ABFF",
//               width: "fit-content",
//             }}
//             onClick={handleAddMoreClick}
//           >
//             + Add more
//           </Typography>
//         </>
//       </Flex>
//       <Flex
//         style={{ width: "100%" }}
//         justify={`${edit ? "space-between" : "flex-end"}`}
//       >
//         {edit && (
//           <ButtonV1 title="Delete" customType="danger" onClick={onDelete} />
//         )}
//         <Flex gap={12}>
//           <ButtonV1
//             title="Cancel"
//             customType="cancel"
//             onClick={() => goToActivity()}
//           />
//           <ButtonV1
//             title="Save"
//             onClick={onSave}
//             customDisabled={disableSaveBtn}
//           />
//         </Flex>
//       </Flex>
//     </>
//   );
// }
