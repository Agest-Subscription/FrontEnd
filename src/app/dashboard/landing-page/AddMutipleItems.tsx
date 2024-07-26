// import * as React from "react";
// import { FC } from "react";
// import { useFieldArray, useFormContext } from "react-hook-form";
// import { DeleteOutlined } from "@ant-design/icons";
// import { PlusOutlined } from "@ant-design/icons";
// import { Flex } from "antd";

// import CustomButton from "@/components/button/CustomButton";
// import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
// import {
//   LandingPageFormValues,
//   LandingPageItemArray,
// } from "@/interfaces/model/landingPage.type";
// import { capitalize } from "@/utils/string";

// type LandingPageItemProps = {
//   onDelete: () => void;
//   index: number;
//   showDelete: boolean;
//   item: LandingPageItemArray;
// };

// const LandingPageItemField: FC<LandingPageItemProps> = ({
//   index,
//   onDelete,
//   showDelete,
// }) => {
//   const { FormField } = useFormWrapperCtx<LandingPageFormValues>();

//   return (
//     <Flex align="center" style={{ width: "100%" }}>
//       <Flex
//         align="start"
//         style={{
//           padding: "24px 40px",
//           borderRadius: 4,
//           border: "solid 1px rgba(38, 62, 86, 0.1)",
//           width: "calc(100% - 56px)",
//         }}
//         gap={40}
//       >
//         <FormField
//           name={"landing_page_items.[].period"}
//           index={[index]}
//           key={index}
//         />

//         <FormField
//           name={"landing_page_items.[].basic_plan_id"}
//           index={[index]}
//           key={index}
//         />

//         <FormField
//           name={"landing_page_items.[].pro_plan_id"}
//           index={[index]}
//           key={index}
//         />

//         <FormField
//           name={"landing_page_items.[].premium_plan_id"}
//           index={[index]}
//           key={index}
//         />
//       </Flex>

//       {showDelete && (
//         <div
//           style={{
//             width: 24,
//             height: 24,
//             padding: "0 16px",
//           }}
//         >
//           <DeleteOutlined
//             style={{
//               fontSize: 18,
//               color: "#D0D5DD",
//             }}
//             onClick={onDelete}
//           />
//         </div>
//       )}
//     </Flex>
//   );
// };

// export default function AddMultipleItems() {
//   const methods = useFormContext<LandingPageFormValues>();

//   const { fields, append, remove } = useFieldArray({
//     control: methods.control,
//     name: "landing_page_items",
//   });
//   const newLandingPageItemsArray = React.useMemo(
//     () => ({
//       period: "",
//       basic_plan_id: "",
//       pro_plan_id: "",
//       premium_plan_id: "",
//     }),
//     [],
//   );
//   const handleLandingPageClick = () => {
//     append({ ...newLandingPageItemsArray });
//   };

//   React.useEffect(() => {
//     if (fields.length === 0) {
//       append(newLandingPageItemsArray);
//     }
//   }, [fields, append, newLandingPageItemsArray]);
//   return (
//     <>
//       <Flex style={{ fontSize: 18, fontWeight: 600, marginBottom: 32 }}>
//         {capitalize("Landing Page Items")}
//       </Flex>
//       <Flex
//         style={{
//           padding: "40px",
//           border: "solid 1px rgba(38, 62, 86, 0.1)",
//           borderRadius: 8,
//         }}
//         vertical
//         gap={8}
//       >
//         {fields.map((item, index) => (
//           <LandingPageItemField
//             key={item.id}
//             index={index}
//             onDelete={() => remove(index)}
//             showDelete={fields.length > 1}
//             item={item}
//           />
//         ))}
//         <Flex gap={40} style={{ marginTop: "56px" }}>
//           <CustomButton
//             title={capitalize("Add landing page")}
//             icon={<PlusOutlined />}
//             onClick={handleLandingPageClick}
//           />
//         </Flex>
//       </Flex>
//     </>
//   );
// }
